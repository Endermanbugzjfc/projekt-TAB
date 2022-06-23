package pl.polsl.shop.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.user.rest.UserDto;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service("userService")
public class UserService {

    private UserRepository userRepository;
    private ShoppingCartService shoppingCartService;

    @Autowired
    public UserService(UserRepository userRepository, ShoppingCartService shoppingCartService) {
        this.userRepository = userRepository;
        this.shoppingCartService = shoppingCartService;
    }

    public User getUser(Long userId) {
        return this.userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("User with ID: " + userId + " does not exist")
        );
    }

    @Transactional
    public User newUser(UserDto userDto) throws SuchUsernameExistsException {
        Optional<User> usr = this.userRepository.findUserByUserName(userDto.userName());

        if(usr.isPresent()) {
            throw new SuchUsernameExistsException("Username: " + userDto.userName() + " already exists! Choose different one!");
        }
        User user = User.fromDto(userDto);
        user.setShoppingCart(shoppingCartService.getCartFor(user));
        return this.userRepository.save(user);
    }

    public boolean logIn(String username, String password) {
        Optional<User> usr = this.userRepository.findUserByUserName(username);
        if (usr.isPresent()) {
            User user = usr.get();
            if (user.getType().equals(Type.DELETED)) {
                throw new InactiveAccountException("Your account has been deleted");
            } else if (user.getType().equals(Type.FIRED)) {
                throw new InactiveAccountException("You have been fired");
            }
            if (user.getPassword().equals(password)) {
                user.setLoggedIn(true);
                return true;
            }
        } else {
            throw new NoSuchUserException("User with username: " + username + " does not exist");
        }
        return false;
    }

    public boolean logOut(String userName) {
        Optional<User> usr = userRepository.findUserByUserName(userName);
        if(usr.isPresent()){
            User user = usr.get();
            user.setLoggedIn(false);
            return true;
        }
        else{
            return false;
        }
    }

    public boolean clearUserData(Long userId) {
        User user = this.getUser(userId);
        return user.clearUserData();
    }

    @Transactional
    public UserDto updateUser(UserDto updatedUserDto, Long id){
        User user = getUser(id);
        if (user != null) {
            if(updatedUserDto.userName() != null) user.setUserName(updatedUserDto.userName());
            if(updatedUserDto.password() != null) user.setPassword(updatedUserDto.password());
            if(updatedUserDto.legalName() != null) user.setLegalName(updatedUserDto.legalName());
            if(updatedUserDto.surname() != null) user.setSurname(updatedUserDto.surname());
            if(updatedUserDto.phoneNumber() != null) user.setPhoneNumber(updatedUserDto.phoneNumber());
            if(updatedUserDto.type() != null) user.setType(updatedUserDto.type());
            if(updatedUserDto.birthDate() != null) user.setBirthDate(updatedUserDto.birthDate());
            if(updatedUserDto.pesel() != null) user.setPesel(updatedUserDto.pesel());
            if(updatedUserDto.employmentDate() != null) user.setEmploymentDate(updatedUserDto.employmentDate());
            if(updatedUserDto.shoppingCartDto() != null) user.setShoppingCart(ShoppingCart.fromDto(updatedUserDto.shoppingCartDto()));
            if(updatedUserDto.addressDto() != null) user.setAddress(Address.fromDto(updatedUserDto.addressDto()));
            this.userRepository.save(user);
            return UserDto.fromUser(user);
        }
        return null;
    }

    public User findUserByShoppingCart_Id(ShoppingCart shoppingCart) {
        return this.userRepository.findUserByShoppingCart(shoppingCart).orElseThrow(
                () -> new NoSuchUserException("User with shopping cart ID: " + shoppingCart.getId() + " does not exist")
        );
    }

    public List<User> findUsers(String name, String surname, String pesel, Type type){
        name = name == null ? "" : name;
        surname = surname == null ? "" : surname;
        pesel = pesel == null ? "" : pesel;

        if(name.trim().isEmpty() && surname.trim().isEmpty() && pesel.trim().isEmpty()){
            return this.userRepository.findAllByType(type);
        }
        if(!name.trim().isEmpty() && !surname.trim().isEmpty() && !pesel.trim().isEmpty()){
            return this.userRepository.findAllByLegalNameAndSurnameAndPeselAndType(name, surname, pesel, type);
        }
        else{
            if(!name.trim().isEmpty() && surname.trim().isEmpty() && pesel.trim().isEmpty()){
                return this.userRepository.findAllByLegalNameAndType(name, type);
            }
            if(name.trim().isEmpty() && !surname.trim().isEmpty() && pesel.trim().isEmpty()){
                return this.userRepository.findAllBySurnameAndType(surname, type);
            }
            if(name.trim().isEmpty() && surname.trim().isEmpty() && !pesel.trim().isEmpty()){
                return this.userRepository.findAllByPeselAndType(pesel, type);
            }
            if(!name.trim().isEmpty() && !surname.trim().isEmpty() && pesel.trim().isEmpty()){
                return this.userRepository.findAllByLegalNameAndSurnameAndType(name, surname, type);
            }
            if(!name.trim().isEmpty() && surname.trim().isEmpty() && !pesel.trim().isEmpty()){
                return this.userRepository.findAllByLegalNameAndPeselAndType(name, pesel, type);
            }
            if(name.trim().isEmpty() && !surname.trim().isEmpty() && !pesel.trim().isEmpty()){
                return this.userRepository.findAllBySurnameAndPeselAndType(surname, pesel, type);
            }
        }
        return Collections.emptyList();
    }
}
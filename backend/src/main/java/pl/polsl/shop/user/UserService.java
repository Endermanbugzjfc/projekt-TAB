package pl.polsl.shop.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.cart.ShoppingCartService;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Service("userService")
public class UserService {

    private UserRepository userRepository;
    private ShoppingCartService shoppingCartService;

    @Autowired
    public UserService(UserRepository userRepository, ShoppingCartService shoppingCartService){
        this.userRepository = userRepository;
        this.shoppingCartService = shoppingCartService;
    }

    public User getUser(Long userId){
        return this.userRepository.findById(userId).orElseThrow(
                ()-> new NoSuchUserException("User with ID: " + userId + " does not exist")
        );
    }

    public User newUser(String userName, String password, String legalName, String surname, String phoneNumber, Type type, Date birthDate,
                        String pesel, LocalDate employmentDate, Address address){
        User user = new User(userName, password, legalName, surname, phoneNumber, type, birthDate, pesel, employmentDate, address);
        user.setShoppingCart(shoppingCartService.getCartFor(user));
        return this.userRepository.save(user);
    }

    public boolean logIn(String username, String password){
        Optional<User> usr = this.userRepository.findUserByUserName(username);
        if(usr.isPresent()){
            User user = usr.get();
            if(user.getType().equals(Type.DELETED)){
                throw new InactiveAccountException("Your account has been deleted");
            }
            else if(user.getType().equals(Type.FIRED)){
                throw new InactiveAccountException("You have been fired");
            }
            if(user.getPassword().equals(password)){
                user.setLoggedIn(true);
                return true;
            }
        }
        else{
            throw new NoSuchUserException("User with username: " + username + " does not exist");
        }
        return false;
    }

    public boolean logOut(Long userId){
        User user = this.getUser(userId);
        user.setLoggedIn(false);
        return true;
    }

    public boolean clearUserData(Long userId){
        User user = this.getUser(userId);
        return user.clearUserData();
    }

    public User findUserByShoppingCart_Id(ShoppingCart shoppingCart){
        return this.userRepository.findUserByShoppingCart_Id(shoppingCart).orElseThrow(
                ()-> new NoSuchUserException("User with shopping cart ID: " + shoppingCart.getId() + " does not exist")
        );
    }
}
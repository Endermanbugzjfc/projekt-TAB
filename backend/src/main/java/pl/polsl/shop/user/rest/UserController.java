package pl.polsl.shop.user.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.user.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private ShoppingCartService shoppingCartService;

    @Autowired
    public UserController(UserService userService, ShoppingCartService shoppingCartService) {
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/{id}")
    public UserDto findUser(@PathVariable(value = "id") Long id) {
        try {
            return this.userService.getUserData(id);
        } catch (UserException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public UserDto saveUser(@Validated @RequestBody UserDto userDto) {
        try {
            return userService.newUser(userDto);
        } catch (SuchUsernameExistsException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public AccountActionResult deleteUser(@PathVariable Long id) {
        boolean success = false;
        String message = null;
        try {
            success = this.userService.clearUserData(id);
        } catch (UserException e) {
            message = e.getMessage();
        }
        return new AccountActionResult(success, message, null);
    }

    @PostMapping("/login")
    public AccountActionResult logUser(@RequestBody UserLogAction userLogAction) {
        boolean result = false;
        String message = null;
        UserDto userDto = null;
        try {
            ;
            result = this.userService.logIn(userLogAction.userName(), userLogAction.password());
            User user = this.userService.getUser(userLogAction.userName());
            Address address = this.userService.getAddressOf(user);
            ShoppingCart shoppingCart = this.shoppingCartService.getCartFor(user);
            userDto = UserDto.newDto(user, address, shoppingCart);
        } catch (UserException e) {
            message = e.getMessage();
        }
        return new AccountActionResult(result, message, userDto);
    }

    @PostMapping("/logout")
    public AccountActionResult logOut(@RequestBody UserLogAction userLogAction) {
        return new AccountActionResult(this.userService.logOut(userLogAction.userName()), null, null);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@RequestBody UserDto newUserDto, @PathVariable Long id) {
        try {
            return userService.updateUser(newUserDto, id);
        } catch (UserException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/find")
    public List<UserDto> findUsers(@RequestBody UserDto userDto) {
        return userService.findUsers(userDto);
    }
}
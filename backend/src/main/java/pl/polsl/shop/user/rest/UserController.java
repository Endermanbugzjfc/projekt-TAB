package pl.polsl.shop.user.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.user.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDto findUser(@PathVariable(value = "id") Long id) {
        try {
            return  this.userService.getUserData(id);
        } catch (UserException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public UserDto saveUser(@Validated @RequestBody UserDto userDto) {
        try {
            return  userService.newUser(userDto);
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
        return new AccountActionResult(success, message);
    }

    @GetMapping("/login/{id}")
    public AccountActionResult logUser(@PathVariable(value = "id") Long id) {
        boolean result = false;
        String message = null;
        try {
            User user = userService.getUser(id);
            result = this.userService.logIn(user.getUserName(), user.getPassword());
        } catch (UserException e) {
            message = e.getMessage();
        }
        return new AccountActionResult(result, message);
    }

    @PostMapping("/logout/{id}")
    public AccountActionResult logOut(@PathVariable(value = "id") Long id) {
        boolean result = false;
        String message = null;
        try {
            result = this.userService.logOut(id);
        } catch (UserException e) {
            message = e.getMessage();
        }
        return new AccountActionResult(result, message);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@RequestBody UserDto newUserDto, @PathVariable Long id) {
        try {
            return userService.updateUser(newUserDto, id);
        } catch (UserException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/find/{type}")
    public List<UserDto> findUsers(@RequestBody UserDto userDto, @PathVariable Type type) {
        return userService.findUsers(userDto.legalName(), userDto.surname(), userDto.pesel(), userDto.type());
    }
}
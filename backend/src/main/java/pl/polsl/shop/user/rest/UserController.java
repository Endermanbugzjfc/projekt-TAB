package pl.polsl.shop.user.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.user.SuchUsernameExistsException;
import pl.polsl.shop.user.Type;
import pl.polsl.shop.user.User;
import pl.polsl.shop.user.UserService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDto findUser(@PathVariable(value = "id") Long id) {
        return UserDto.fromUser(this.userService.getUser(id));
    }

    @PostMapping()
    public UserDto saveUser(@Validated @RequestBody UserDto userDto){
        try {
            return UserDto.fromUser(userService.newUser(userDto));
        } catch (SuchUsernameExistsException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        return this.userService.clearUserData(id);
    }

    @GetMapping("/login")
    public boolean logUser(@RequestBody String userName, String password) {
        return this.userService.logIn(userName, password);
    }

    @PostMapping("/logout")
    public boolean logOut(@RequestBody String userName){
        return this.userService.logOut(userName);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@RequestBody UserDto newUserDto, @PathVariable Long id) {
        return userService.updateUser(newUserDto, id);
    }

    @PostMapping("/find/{type}")
    public List<UserDto> findUsers(@RequestBody String name, String surname, String pesel, @PathVariable Type type){
        return userService.findUsers(name, surname, pesel, type).stream().map(UserDto::fromUser).toList();
    }
}
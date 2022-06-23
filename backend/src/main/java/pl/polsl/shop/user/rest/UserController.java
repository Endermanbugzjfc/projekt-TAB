package pl.polsl.shop.user.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.user.SuchUsernameExistsException;
import pl.polsl.shop.user.Type;
import pl.polsl.shop.user.User;
import pl.polsl.shop.user.UserService;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/login/{id}")
    public boolean logUser(@PathVariable(value = "id") Long id) {
        User user = userService.getUser(id);

        if(user != null) {
            if (this.userService.logIn(user.getUserName(), user.getPassword())) {
                return true;
            }
        }
        return false;
    }

    @PostMapping("/logout/{id}")
    public boolean logOut(@PathVariable(value = "id") Long id){
        User user = userService.getUser(id);
        if(user != null) {
            if (this.userService.logOut(user.getId())) {
                return true;
            }
        }
        return false;
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@RequestBody UserDto newUserDto, @PathVariable Long id) {
        return userService.updateUser(newUserDto, id);
    }

    @PostMapping("/find/{type}")
    public List<UserDto> findUsers(@RequestBody UserDto userDto, @PathVariable Type type){
        return userService.findUsers(userDto.legalName(), userDto.surname(), userDto.pesel(), userDto.type())
                .stream().map(UserDto::fromUser).collect(Collectors.toList());
    }
}
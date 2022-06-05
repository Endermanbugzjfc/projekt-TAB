package pl.polsl.shop.user;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

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
    public void deleteUser(@PathVariable Long id) {
        this.userService.clearUserData(id);
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
    public UserDto updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userService.updateUser(UserDto.fromUser(newUser), id);
    }
}
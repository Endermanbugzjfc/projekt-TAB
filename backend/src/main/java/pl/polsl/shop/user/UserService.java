package pl.polsl.shop.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.order.OrderService;

@Service("userService")
public class UserService {

    private UserRepository userRepository;
    private ShoppingCartService shoppingCartService;
    private OrderService orderService;

    @Autowired
    public UserService(UserRepository userRepository, ShoppingCartService shoppingCartService, OrderService orderService){
        this.userRepository = userRepository;
        this.shoppingCartService = shoppingCartService;
        this.orderService = orderService;
    }

    public User getUser(Long userId){
        return this.userRepository.findById(userId).orElseThrow(
                ()-> new NoSuchUserException("User with ID: " + userId + " does not exist")
        );
    }
}

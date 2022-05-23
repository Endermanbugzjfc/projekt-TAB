package pl.polsl.shop.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.user.User;
import pl.polsl.shop.user.UserService;

@Service("orderService")
public class OrderService {
    private OrderRepository orderRepository;
    private OrderedProductRepository orderedProductRepository;
    private ShoppingCartService shoppingCartService;
    private UserService userService;

    @Autowired
    public OrderService(
            OrderRepository orderRepository, ShoppingCartService shoppingCartService,
            OrderedProductRepository orderedProductRepository, UserService userService
    ) {
        this.orderRepository = orderRepository;
        this.shoppingCartService = shoppingCartService;
        this.orderedProductRepository = orderedProductRepository;
        this.userService = userService;
    }

    public Order newOrder(Long userId, PaymentMethod paymentMethod) {
        User user = this.userService.getUser(userId);
        return this.orderRepository.save(new Order(user, paymentMethod));
    }

    public Order getOrder(Long orderId) {
        return this.orderRepository.findById(orderId).orElseThrow(
                () -> new NoSuchOrderException("Order with id: " + orderId + " does not exist")
        );
    }
}

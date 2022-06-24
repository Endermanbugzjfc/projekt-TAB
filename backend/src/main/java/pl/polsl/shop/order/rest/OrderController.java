package pl.polsl.shop.order.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.order.Order;
import pl.polsl.shop.order.OrderService;
import pl.polsl.shop.order.PaymentMethod;
import pl.polsl.shop.user.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/order")
public class OrderController {
    private OrderService orderService;
    private UserService userService;
    private ShoppingCartService shoppingCartService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService, ShoppingCartService shoppingCartService) {
        this.orderService = orderService;
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
    }

    @PostMapping("/cart/{cartId}")
    public OrderDto buy(@PathVariable Long cartId, @RequestBody PaymentMethod paymentMethod) {
        Order order = this.orderService.newOrder(cartId, paymentMethod);
        return OrderDto.fromOrder(
                this.orderService.newOrder(cartId, paymentMethod), this.userService.getAddressOf(order.getUser()), this.shoppingCartService.getCartFor(order.getUser()));
    }

    @PostMapping("/user/{id}/report")
    public List<OrderDto> generateShortReport(@PathVariable("id") Long userId) {
        return orderService.generateShortReport(userId);
    }

    @PostMapping("/user/{id}/report/full/{orderId}")
    public OrderLongReportDto generateLongReport(@PathVariable("id") Long userId, @PathVariable Long orderId) {
        return orderService.generateLongReport(userId, orderId);
    }
}
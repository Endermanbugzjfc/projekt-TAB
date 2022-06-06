package pl.polsl.shop.order.rest;

import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.order.OrderService;
import pl.polsl.shop.order.PaymentMethod;

@RestController
@RequestMapping(path = "/order")
public class OrderController {
    private OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/cart/{cartId}")
    public OrderDto buy(@PathVariable Long cartId, @RequestBody PaymentMethod paymentMethod){
        return OrderDto.fromOrder(this.orderService.newOrder(cartId, paymentMethod));
    }

    // generate short report

    // generate long report
}
package pl.polsl.shop.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.order.rest.OrderDto;
import pl.polsl.shop.order.rest.OrderLongReportDto;
import pl.polsl.shop.order.rest.OrderedProductDto;
import pl.polsl.shop.user.User;
import pl.polsl.shop.user.UserDto;
import pl.polsl.shop.user.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service("orderService")
public class OrderService {
    private OrderRepository orderRepository;
    private OrderedProductRepository orderedProductRepository;
    private UserService userService;

    @Autowired
    public OrderService(
            OrderRepository orderRepository,
            OrderedProductRepository orderedProductRepository,
            UserService userService
    ) {
        this.orderRepository = orderRepository;
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

    public List<OrderDto> generateShortReport(Long userId){
        User user = userService.getUser(userId);
        return this.orderRepository.findByUser_Id(user).stream().map(OrderDto::fromOrder).collect(Collectors.toList());
    }

    public OrderLongReportDto generateLongReport(Long userId, Long orderId){
        Order order = getOrder(orderId);
        User user = this.userService.getUser(userId);
        List<OrderedProduct> orderedProducts = this.orderedProductRepository.findOrderedProductByOrder_Id(order);
        Double totalCost = 0.0;
        for (OrderedProduct orderedProduct: orderedProducts) {
            totalCost += orderedProduct.getQuantity() * orderedProduct.getPrice();
        }
        return new OrderLongReportDto(
                order.getId(),
                UserDto.fromUser(user),
                order.getOrderDate(),
                order.getPaymentMethod(),
                orderedProducts.stream().map(OrderedProductDto::fromOrderedProduct).collect(Collectors.toList()),
                totalCost
        );
    }
}
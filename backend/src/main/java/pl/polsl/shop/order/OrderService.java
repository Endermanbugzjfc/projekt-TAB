package pl.polsl.shop.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.polsl.shop.order.rest.OrderDto;
import pl.polsl.shop.order.rest.OrderLongReportDto;
import pl.polsl.shop.order.rest.OrderedProductDto;

import pl.polsl.shop.cart.SelectedProduct;
import pl.polsl.shop.cart.ShoppingCart;

import pl.polsl.shop.user.User;
import pl.polsl.shop.user.UserDto;
import pl.polsl.shop.user.UserService;

import java.util.Collection;
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

    private Order newOrder(Long userId, PaymentMethod paymentMethod) {
        User user = this.userService.getUser(userId);
        return new Order(user, paymentMethod);
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
        List<OrderedProduct> orderedProducts = this.orderedProductRepository.findAllByOrder_Id(order);
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
    private Order addProducts(Order order, Collection<SelectedProduct> selectedProducts) {
        List<OrderedProduct> orderedProducts = selectedProducts.stream()
                .map(selectedProduct -> this.orderedProductRepository.findByOrder_IdAndProduct_Id(
                                order, selectedProduct.getProduct()
                        ).orElseGet(() -> new OrderedProduct(order, selectedProduct.getProduct()))
                ).peek(orderedProduct -> orderedProduct.setQuantity(orderedProduct.getQuantity() + 1))// i think SelectedProduct requires its quantity
                .toList();
        this.orderedProductRepository.saveAll(orderedProducts);
        return order;
    }

    public Order commitOrder(ShoppingCart shoppingCart, PaymentMethod paymentMethod) {
        User user = shoppingCart.getUser();
        Order order = this.newOrder(user.getId(), paymentMethod);
        this.addProducts(order, shoppingCart.getSelectedProducts());
        return this.orderRepository.save(order);
    }

    public List<Order> getOrdersFor(User user) {
        return this.orderRepository.findAllByUser_Id(user);
    }

    public List<OrderReportDto> getAllReportsFor(User user) {
        return this.orderRepository.findAllByUser_Id(user).stream()
                .map(order -> this.orderedProductRepository.findOrderedProductsByOrder_Id(order))
                .map(orderedProducts -> {
                            Order order = orderedProducts.get(0).getOrder();
                            double sum = orderedProducts.stream()
                                    .mapToDouble(OrderedProduct::getPrice)
                                    .sum();
                            return new OrderReportDto(order, orderedProducts, sum);
                        }
                ).toList();
    }
}

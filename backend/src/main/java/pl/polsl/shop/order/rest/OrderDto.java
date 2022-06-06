package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.Order;
import pl.polsl.shop.order.PaymentMethod;
import pl.polsl.shop.user.UserDto;

import java.io.Serializable;
import java.time.LocalDate;

public record OrderDto(Long id, UserDto userDto,
        LocalDate orderDate, PaymentMethod paymentMethod) implements Serializable {

    public static OrderDto fromOrder(Order order) {
        return new OrderDto(
                order.getId(), order.getUser(),
                order.getOrderDate(), order.getPaymentMethod()
        );
    }
}
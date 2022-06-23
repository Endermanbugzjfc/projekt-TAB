package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.Order;
import pl.polsl.shop.order.PaymentMethod;
import pl.polsl.shop.user.rest.UserDto;

import java.io.Serializable;
import java.time.LocalDate;

public record OrderDto(Long id, UserDto user,
        LocalDate orderDate, PaymentMethod paymentMethod) implements Serializable {

    public static OrderDto fromOrder(Order order) {
        return new OrderDto(
                order.getId(), UserDto.fromUser(order.getUser()),
                order.getOrderDate(), order.getPaymentMethod()
        );
    }
}
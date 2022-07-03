package pl.polsl.shop.order.rest;

import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.order.Order;
import pl.polsl.shop.order.PaymentMethod;
import pl.polsl.shop.user.Address;
import pl.polsl.shop.user.rest.UserDto;

import java.io.Serializable;
import java.time.LocalDate;

public record OrderDto(Long id, UserDto user,
                       LocalDate orderDate, PaymentMethod paymentMethod) implements Serializable {

    public static OrderDto fromOrder(Order order, Address userAddress, ShoppingCart userCart) {
        return new OrderDto(
                order.getId(), UserDto.newDto(order.getUser(), userAddress, userCart),
                order.getOrderDate(), order.getPaymentMethod()
        );
    }
}
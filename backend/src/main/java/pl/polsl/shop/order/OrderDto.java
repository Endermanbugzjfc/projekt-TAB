package pl.polsl.shop.order;

import pl.polsl.shop.user.UserDto;

import java.io.Serializable;
import java.time.LocalDate;

public record OrderDto(Long id, UserDto userDto,
        LocalDate orderDate, PaymentMethod paymentMethod) implements Serializable {
}

package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.PaymentMethod;
import pl.polsl.shop.user.rest.UserDto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public record OrderLongReportDto(Long id, UserDto userDto, LocalDate orderDate, PaymentMethod paymentMethod,
                                 List<OrderedProductDto> orderedProducts, Double totalCost) implements Serializable {

}
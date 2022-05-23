package pl.polsl.shop.order;

import pl.polsl.shop.user.User;

import java.util.List;

public record OrderReportDto(User user, Order order, List<OrderedProduct> orderedProducts) {
}

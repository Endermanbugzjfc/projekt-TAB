package pl.polsl.shop.order;

import pl.polsl.shop.user.User;

import java.util.List;

public record OrderReportDto(
        Order order, List<OrderedProduct> orderedProducts, double totalPrice
) {
}

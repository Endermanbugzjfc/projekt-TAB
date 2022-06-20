package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.Order;
import pl.polsl.shop.order.OrderedProduct;

import java.util.List;

public record OrderReportDto(
        Order order, List<OrderedProduct> orderedProducts, double totalPrice
) {
}
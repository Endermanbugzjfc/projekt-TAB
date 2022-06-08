package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.OrderedProduct;

import java.io.Serializable;

public record OrderedProductDto(Long id, Integer quantity, ProductDTO productDto, Double price) implements Serializable {
    public static OrderedProductDto fromOrderedProduct(OrderedProduct orderedProduct) {
        return new OrderDto(
                orderedProduct.getId(), orderedProduct.getQuantity(),
                ProductDTO.fromProduct(orderedProduct.getProduct()), orderedProduct.getQuantity()
        );
    }
}
package pl.polsl.shop.order.rest;

import pl.polsl.shop.order.OrderedProduct;
import pl.polsl.shop.product.rest.ProductDTO;

import java.io.Serializable;

public record OrderedProductDto(Long id, Integer quantity, ProductDTO product, Double price) implements Serializable {
    public static OrderedProductDto fromOrderedProduct(OrderedProduct orderedProduct) {
        return new OrderedProductDto(
                orderedProduct.getId(), orderedProduct.getQuantity(),
                ProductDTO.fromProduct(orderedProduct.getProduct()), orderedProduct.getPrice()
        );
    }
}
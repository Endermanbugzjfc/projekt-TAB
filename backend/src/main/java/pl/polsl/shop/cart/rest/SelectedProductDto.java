package pl.polsl.shop.cart.rest;

import pl.polsl.shop.cart.SelectedProduct;
import pl.polsl.shop.product.rest.ProductDTO;

import java.io.Serializable;

public record SelectedProductDto (Integer quantity, ProductDTO product) implements Serializable {
    public static SelectedProductDto fromSelectedProduct(SelectedProduct selectedProduct) {
        return new SelectedProductDto(
                selectedProduct.getQuantity(),
                ProductDTO.fromProduct(selectedProduct.getProduct())
        );
    }
}
package pl.polsl.shop.cart.rest;

import pl.polsl.shop.cart.SelectedProduct;
import pl.polsl.shop.product.rest.ProductDTO;

import java.io.Serializable;

public record SelectedProductDto (Long id, ProductDTO productDTO) implements Serializable {
    public static SelectedProductDto fromSelectedProduct(SelectedProduct selectedProduct) {
        return new SelectedProductDto(
                selectedProduct.getId(), ProductDTO.fromProduct(selectedProduct.getProduct())
        );
    }
}
package pl.polsl.shop.cart.rest;

import pl.polsl.shop.cart.SelectedProduct;
import pl.polsl.shop.product.rest.ProductDTO;

import java.io.Serializable;

public record SelectedProductDto (Long id, Integer quantity, ProductDTO productDTO, ShoppingCartDto shoppingCartDto) implements Serializable {
    public static SelectedProductDto fromSelectedProduct(SelectedProduct selectedProduct) {
        return new SelectedProductDto(
                selectedProduct.getId(), selectedProduct.getQuantity(), ProductDTO.fromProduct(selectedProduct.getProduct()),
                ShoppingCartDto.fromShoppingCart(selectedProduct.getCart())
        );
    }
}
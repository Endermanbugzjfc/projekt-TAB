package pl.polsl.shop.cart.rest;

import pl.polsl.shop.cart.ShoppingCart;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public record ShoppingCartDto(LocalDate creationDate, List<SelectedProductDto> selectedProducts) implements Serializable {
    public static ShoppingCartDto fromShoppingCart(ShoppingCart shoppingCart) {
        return new ShoppingCartDto(
                shoppingCart.getCreationDate(),
                shoppingCart.getSelectedProducts().stream()
                        .map(SelectedProductDto::fromSelectedProduct)
                        .toList()
        );
    }
}

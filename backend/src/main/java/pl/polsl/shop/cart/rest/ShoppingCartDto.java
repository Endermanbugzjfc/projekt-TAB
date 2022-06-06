package pl.polsl.shop.cart.rest;

import pl.polsl.shop.cart.SelectedProduct;
import pl.polsl.shop.cart.ShoppingCart;

import java.time.LocalDate;
import java.util.List;

public record ShoppingCartDto(
        Long id, LocalDate creationDate, Integer itemsAmount, List<SelectedProduct> selectedProducts
) {

    public static ShoppingCartDto fromShoppingCart(ShoppingCart shoppingCart) {
        return new ShoppingCartDto(
                shoppingCart.getId(), shoppingCart.getCreationDate(),
                shoppingCart.getItemsAmount(), shoppingCart.getSelectedProducts()
        );
    }
}
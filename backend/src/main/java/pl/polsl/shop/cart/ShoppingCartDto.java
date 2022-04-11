package pl.polsl.shop.cart;

import pl.polsl.shop.cart.SelectedProduct;

import java.util.Date;
import java.util.List;

public record ShoppingCartDto(
        Long id, Date creationDate, List<SelectedProduct> selectedProducts
) {
}

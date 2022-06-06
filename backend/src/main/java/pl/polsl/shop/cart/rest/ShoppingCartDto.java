package pl.polsl.shop.cart;

import java.util.Date;
import java.util.List;

public record ShoppingCartDto(
        Long id, Date creationDate, List<SelectedProduct> selectedProducts
) {
}

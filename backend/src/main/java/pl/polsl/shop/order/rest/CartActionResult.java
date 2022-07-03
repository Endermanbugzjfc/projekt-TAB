package pl.polsl.shop.order.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import pl.polsl.shop.cart.rest.ShoppingCartDto;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CartActionResult(boolean success, ShoppingCartDto shoppingCart, String message) {
}

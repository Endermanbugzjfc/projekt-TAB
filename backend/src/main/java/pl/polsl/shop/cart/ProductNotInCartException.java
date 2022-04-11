package pl.polsl.shop.cart;

public class ProductNotInCartException extends CartException {
    public ProductNotInCartException(String message) {
        super(message);
    }
}

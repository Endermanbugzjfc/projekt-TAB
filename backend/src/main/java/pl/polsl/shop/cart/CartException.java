package pl.polsl.shop.cart;

public abstract class CartException extends RuntimeException {
    public CartException(String message) {
        super(message);
    }
}

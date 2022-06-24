package pl.polsl.shop.cart;

public abstract class CartException extends Exception {
    public CartException(String message) {
        super(message);
    }
}

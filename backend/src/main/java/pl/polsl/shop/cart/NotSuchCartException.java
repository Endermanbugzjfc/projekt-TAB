package pl.polsl.shop.cart;

public class NotSuchCartException extends CartException {
    public NotSuchCartException(String message) {
        super(message);
    }
}

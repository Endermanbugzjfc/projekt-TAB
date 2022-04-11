package pl.polsl.shop.cart;

public class ExpiredCartException extends CartException {
    public ExpiredCartException(String message) {
        super(message);
    }
}

package pl.polsl.shop.order;

public class NoSuchOrderException extends OrderException {
    public NoSuchOrderException(String message) {
        super(message);
    }
}

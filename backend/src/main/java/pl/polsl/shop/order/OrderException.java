package pl.polsl.shop.order;

public class OrderException extends RuntimeException {
    public OrderException(String message) {
        super(message);
    }
}
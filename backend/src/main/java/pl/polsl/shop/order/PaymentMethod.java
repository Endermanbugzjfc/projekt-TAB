package pl.polsl.shop.order;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentMethod {
    TRANSFER, CARD, BLIK, CASH;

    @JsonCreator
    public static PaymentMethod fromJson(@JsonProperty("paymentMethod") String paymentMethod) {
        return PaymentMethod.valueOf(paymentMethod);
    }
}
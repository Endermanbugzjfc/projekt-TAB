package pl.polsl.shop.product.rest;

public record ProductPriceUpdateDTO(Long productId, double newPrice) {
}

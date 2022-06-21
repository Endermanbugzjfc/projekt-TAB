package pl.polsl.shop.product.rest;

public record ProductRestockDTO(Long productId, int newQuantity) {
}

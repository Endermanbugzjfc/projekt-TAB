package pl.polsl.shop.product.rest;

import pl.polsl.shop.product.Product;
import pl.polsl.shop.product.ProductCategory;

public record ProductDTO(
        Long productId, String name, String producer,
        String description, ProductCategory category,
        int inStock, double purchasePrice, double retailPrice) {

    public static ProductDTO fromProduct(Product product) {
        return new ProductDTO(
                product.getId(), product.getName(),
                product.getProducer(), product.getDescription(),
                product.getCategory(), product.getAvailableInStock(),
                product.getPurchasePrice(), product.getRetailPrice()
        );
    }
}

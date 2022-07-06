package pl.polsl.shop.product.rest;

public record ProductReportDTO(Long productId, ProductDTO product, double totalIncome, double totalExpense) {
}

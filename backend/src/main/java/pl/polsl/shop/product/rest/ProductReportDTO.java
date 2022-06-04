package pl.polsl.shop.product.rest;

public record ProductReportDTO(Long productId, String productName, double totalIncome, double totalExpense) {
}

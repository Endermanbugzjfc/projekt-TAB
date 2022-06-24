package pl.polsl.shop.product.rest;

import java.time.LocalDate;

public record ProductReportQueryDTO(LocalDate start, LocalDate end) {
}

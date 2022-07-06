package pl.polsl.shop.product.rest;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProductReportQueryDTO(Long productId , LocalDate start, LocalDate end) {
}

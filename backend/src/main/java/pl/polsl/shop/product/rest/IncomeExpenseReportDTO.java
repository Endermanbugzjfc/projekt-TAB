package pl.polsl.shop.product.rest;

import java.time.LocalDate;

public record IncomeExpenseReportDTO(LocalDate start, LocalDate end, double totalIncome, double totalExpense) {
}

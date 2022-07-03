package pl.polsl.shop.product.rest;

import java.util.Date;

public record ProductTimeReportDTO (Date dateFrom, Date dateTo, double totalIncome, double totalExpense){
}
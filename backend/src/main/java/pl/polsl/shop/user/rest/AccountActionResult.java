package pl.polsl.shop.user.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public record AccountActionResult(boolean success, String message, UserDto user) {
}

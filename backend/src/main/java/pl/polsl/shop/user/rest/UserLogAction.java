package pl.polsl.shop.user.rest;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserLogAction(String userName, String password) {
}

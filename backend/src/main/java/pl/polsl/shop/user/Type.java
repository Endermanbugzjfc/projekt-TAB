package pl.polsl.shop.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum Type {
    @JsonProperty("customer")
    CUSTOMER,

    @JsonProperty("employee")
    EMPLOYEE,

    @JsonProperty("admin")
    ADMIN,

    @JsonProperty("fired")
    FIRED,

    @JsonProperty("deleted")
    DELETED

}

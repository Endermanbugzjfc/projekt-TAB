package pl.polsl.shop.user.rest;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.cart.rest.ShoppingCartDto;
import pl.polsl.shop.user.Address;
import pl.polsl.shop.user.Type;
import pl.polsl.shop.user.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@JsonInclude(Include.NON_NULL)
public record UserDto(Long id, String userName, String password, String legalName,
                      String surname, String phoneNumber, Type type, Date birthDate,
                      String pesel, LocalDate employmentDate, AddressDto address,
                      ShoppingCartDto shoppingCart
) implements Serializable {
    public static UserDto newDto(User user, Address userAddress, ShoppingCart userCart) {
        return new UserDto(
                user.getId(), user.getUserName(),
                user.getPassword(), user.getLegalName(),
                user.getSurname(), user.getPhoneNumber(),
                user.getType(), user.getBirthDate(),
                user.getPesel(), user.getEmploymentDate(),
                AddressDto.fromAddress(userAddress),
                ShoppingCartDto.fromShoppingCart(userCart)
        );
    }
}
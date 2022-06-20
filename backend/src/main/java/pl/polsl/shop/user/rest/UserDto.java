package pl.polsl.shop.user.rest;

import pl.polsl.shop.cart.ShoppingCartDto;
import pl.polsl.shop.user.Type;
import pl.polsl.shop.user.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

public record UserDto(Long id, String userName, String password, String legalName,
                      String surname, String phoneNumber, Type type, Date birthDate,
                      String pesel, LocalDate employmentDate, AddressDto addressDto,
                      ShoppingCartDto shoppingCartDto
                      ) implements Serializable {

    public static UserDto fromUser(User user){
        return new UserDto(
                user.getId(), user.getUserName(),
                user.getPassword(), user.getLegalName(),
                user.getSurname(), user.getPhoneNumber(),
                user.getType(), user.getBirthDate(),
                user.getPesel(), user.getEmploymentDate(),
                AddressDto.fromAddress(user.getAddress()), ShoppingCartDto.fromShoppingCart(user.getShoppingCart())
        );
    }
}
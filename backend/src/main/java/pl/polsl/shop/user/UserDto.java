package pl.polsl.shop.user;

import pl.polsl.shop.cart.ShoppingCart;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

public record UserDto(Long id, String userName, String password, String legalName,
                      String surname, String phoneNumber, Type type, Date birthDate,
                      String pesel, LocalDate employmentDate, Address address,
                      ShoppingCart shoppingCart, boolean isLoggedIn
                      ) implements Serializable {

    public static UserDto fromUser(User user){
        return new UserDto(
                user.getId(), user.getUserName(),
                user.getPassword(), user.getLegalName(),
                user.getSurname(), user.getPhoneNumber(),
                user.getType(), user.getBirthDate(),
                user.getPesel(), user.getEmploymentDate(),
                user.getAddress(), user.getShoppingCart(),
                user.isLoggedIn()
        );
    }
}
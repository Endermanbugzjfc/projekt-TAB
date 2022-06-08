package pl.polsl.shop.user;

import java.io.Serializable;
import java.time.LocalDate;

public record UserDto(Long id, String userName, String password, String legalName,
                      String surname, String address, int phoneNumber, String type,
                      LocalDate employmentDate) implements Serializable {
}

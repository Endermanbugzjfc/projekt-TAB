package pl.polsl.shop.user;

import pl.polsl.shop.EntityUtils;
import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.user.rest.UserDto;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Table(name = "users")
@Entity(name = "User")
public class User {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "legal_name", nullable = false)
    private String legalName;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "birth_date")
    private Date birthDate;

    @Column(name = "pesel")
    private String pesel;

    @Column(name = "employment_date")
    private LocalDate employmentDate;
    @Transient
    private boolean loggedIn;

    public User() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = EntityUtils.nonNullOrDefault(id, this.id);
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = EntityUtils.nonNullOrDefault(userName, this.userName);
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = EntityUtils.nonNullOrDefault(password, this.password);
    }

    public String getLegalName() {
        return this.legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = EntityUtils.nonNullOrDefault(legalName, this.legalName);
    }

    public String getSurname() {
        return this.surname;
    }

    public void setSurname(String surname) {
        this.surname = EntityUtils.nonNullOrDefault(surname, this.surname);
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = EntityUtils.nonNullOrDefault(phoneNumber, this.phoneNumber);
    }

    public Type getType() {
        return this.type;
    }

    public void setType(Type type) {
        this.type = EntityUtils.nonNullOrDefault(type, this.type);
    }

    public Date getBirthDate() {
        return this.birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = EntityUtils.nonNullOrDefault(birthDate, this.birthDate);
    }

    public String getPesel() {
        return this.pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public LocalDate getEmploymentDate() {
        return this.employmentDate;
    }

    public void setEmploymentDate(LocalDate employmentDate) {
        this.employmentDate = EntityUtils.nonNullOrDefault(employmentDate, this.employmentDate);
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public boolean clearUserData() {
        setPassword("");
        setLegalName("");
        setSurname("");
        setPhoneNumber("");
        setPesel("");
        if (getType().equals(Type.CUSTOMER)) {
            setType(Type.DELETED);
        } else {
            setType(Type.FIRED);
        }
        return true;
    }

    @Transient
    public static User fromDto(UserDto userDto) {
        User user = new User();
        user.parseDto(userDto);
        return user;
    }

    public void parseDto(UserDto userDto) { //todo add null checks
        this.setUserName(userDto.userName());
        this.setPassword(userDto.password());
        this.setLegalName(userDto.legalName());
        this.setSurname(userDto.surname());
        this.setPhoneNumber(userDto.phoneNumber());
        this.setType(userDto.type());
        this.setBirthDate(userDto.birthDate());
        this.setPesel(userDto.pesel());
        this.setEmploymentDate(userDto.employmentDate());
    }
}
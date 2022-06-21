package pl.polsl.shop.user;

import pl.polsl.shop.cart.ShoppingCart;
import pl.polsl.shop.user.rest.UserDto;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Table(name="users")
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
    private Type type;

    @Column(name = "birth_date")
    private Date birthDate;

    @Column(name = "pesel")
    private String pesel;

    @Column(name = "employment_date")
    private LocalDate employmentDate;

    @OneToOne(mappedBy = "user")
    private Address address;

    @OneToOne(mappedBy = "user")
    private ShoppingCart shoppingCart;

    @Transient
    private boolean loggedIn;

    public User() {
    }

    public User(String userName, String password, String legalName, String surname, String phoneNumber, Type type, Date birthDate, String pesel, LocalDate employmentDate, Address address) {
        this.userName = userName;
        this.password = password;
        this.legalName = legalName;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.type = type;
        this.birthDate = birthDate;
        this.pesel = pesel;
        this.employmentDate = employmentDate;
        this.address = address;
        this.loggedIn = false;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLegalName() {
        return this.legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getSurname() {
        return this.surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Type getType() {
        return this.type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Date getBirthDate() {
        return this.birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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
        this.employmentDate = employmentDate;
    }

    public ShoppingCart getShoppingCart() {
        return this.shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
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
        setAddress(null);
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
        user.setUserName(userDto.userName());
        user.setPassword(userDto.password());
        user.setLegalName(userDto.legalName());
        user.setSurname(userDto.surname());
        user.setPhoneNumber(userDto.phoneNumber());
        user.setType(userDto.type());
        user.setBirthDate(userDto.birthDate());
        user.setPesel(userDto.pesel());
        user.setEmploymentDate(userDto.employmentDate());
        user.setAddress(Address.fromDto(userDto.addressDto()));
        user.setShoppingCart(ShoppingCart.fromDto(userDto.shoppingCartDto()));
        return user;
    }
}
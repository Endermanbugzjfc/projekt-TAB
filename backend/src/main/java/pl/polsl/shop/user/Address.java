package pl.polsl.shop.user;

import pl.polsl.shop.user.rest.AddressDto;

import javax.persistence.*;

@Table(name = "addresses")
@Entity(name = "Address")
public class Address {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_sequence"
    )
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "street_name", nullable = false)
    private String streetName;

    @Column(name = "street_number", nullable = false)
    private String streetNumber;

    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "country", nullable = false)
    private String country;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Address(){}

    public Address(String streetName, String streetNumber, String zipCode, String location, String country, User user){
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.zipCode = zipCode;
        this.location = location;
        this.country = country;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Transient
    public static Address fromDto(AddressDto addressDto){
        Address address = new Address();
        address.setCountry(addressDto.country());
        address.setZipCode(addressDto.zipCode());
        address.setLocation(addressDto.location());
        address.setStreetName(addressDto.streetName());
        address.setStreetNumber(addressDto.streetNumber());
        return address;
    }
}
package pl.polsl.shop.user.rest;

import pl.polsl.shop.user.Address;

public record AddressDto(String country, String zipCode, String location, String streetName, String streetNumber) {
    public static AddressDto fromAddress(Address address) {
        return new AddressDto(
                address.getCountry(), address.getZipCode(), address.getLocation(),
                address.getStreetName(), address.getStreetNumber()
        );
    }
}
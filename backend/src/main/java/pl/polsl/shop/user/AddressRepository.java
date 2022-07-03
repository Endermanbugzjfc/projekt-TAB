package pl.polsl.shop.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface AddressRepository extends JpaRepository<Address, Long> {
    Address findAddressByUser(User user);
}

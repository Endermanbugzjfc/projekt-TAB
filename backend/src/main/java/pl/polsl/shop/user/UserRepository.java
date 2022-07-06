package pl.polsl.shop.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.cart.ShoppingCart;

import java.util.List;
import java.util.Optional;

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserName(String userName);
    List<User> findAllByPeselAndType(String pesel, Type type);
    List<User> findAllByLegalNameAndSurnameAndType(String legalName, String surname, Type type);
    List<User> findAllByType(Type type);
}
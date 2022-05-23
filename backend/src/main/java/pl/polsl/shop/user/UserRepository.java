package pl.polsl.shop.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.cart.ShoppingCart;

import java.util.Optional;

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserName(String userName);
    Optional<User> findUserByShoppingCart_Id(ShoppingCart shoppingCart);
}
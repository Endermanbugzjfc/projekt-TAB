package pl.polsl.shop.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.user.User;

import java.util.List;

@Repository
interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser_Id(User user);
}
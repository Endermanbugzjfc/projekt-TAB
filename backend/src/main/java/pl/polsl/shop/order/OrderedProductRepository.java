package pl.polsl.shop.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.product.Product;

import java.util.List;
import java.util.Optional;

@Repository
interface OrderedProductRepository extends JpaRepository<OrderedProduct, Long> {
    List<OrderedProduct> findAllByOrder_Id(Order order);
    Optional<OrderedProduct> findByOrder_IdAndProduct_Id(Order order, Product product);
}
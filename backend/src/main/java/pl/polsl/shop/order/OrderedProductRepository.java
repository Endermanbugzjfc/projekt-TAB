package pl.polsl.shop.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.product.Product;

import java.util.List;
import java.util.Optional;

@Repository
interface OrderedProductRepository extends JpaRepository<OrderedProduct, Long> {
    List<OrderedProduct> findAllByOrder(Order order);
    Optional<OrderedProduct> findByOrderAndProduct(Order order, Product product);
    List<OrderedProduct> findAllByProduct(Product product);
    List<OrderedProduct> findOrderedProductsByOrder(Order order);
}
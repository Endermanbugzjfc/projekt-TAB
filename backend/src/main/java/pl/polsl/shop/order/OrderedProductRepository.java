package pl.polsl.shop.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.product.Product;

import java.util.List;
import java.util.Optional;

@Repository
interface OrderedProductRepository extends JpaRepository<OrderedProduct, Long> {
    Optional<OrderedProduct> findByOrder_IdAndProduct_Id(Order order, Product product);

    List<OrderedProduct> findOrderedProductsByOrder_Id(Order order);
}
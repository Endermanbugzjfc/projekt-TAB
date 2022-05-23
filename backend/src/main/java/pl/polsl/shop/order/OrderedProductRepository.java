package pl.polsl.shop.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface OrderedProductRepository extends JpaRepository<OrderedProduct, Long> {
}
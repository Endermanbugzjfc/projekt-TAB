package pl.polsl.shop.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface RestockRepository extends JpaRepository<ProductRestock, Long> {
    List<ProductRestock> findProductRestocksByProduct(Product product);
}

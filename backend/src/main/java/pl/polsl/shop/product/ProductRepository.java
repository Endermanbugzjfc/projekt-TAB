package pl.polsl.shop.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByCategoryEquals(ProductCategory productCategory);
    List<Product> findAllByRetailPriceBetween(double min, double max);
}
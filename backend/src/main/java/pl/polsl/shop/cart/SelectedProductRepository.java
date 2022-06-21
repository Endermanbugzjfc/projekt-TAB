package pl.polsl.shop.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.product.Product;

@Repository
interface SelectedProductRepository extends JpaRepository<SelectedProduct, Long> {
    SelectedProduct findSelectedProductByProduct(Product product);
}
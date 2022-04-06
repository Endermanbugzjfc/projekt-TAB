package pl.polsl.shop.cart.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SelectedProductRepository extends JpaRepository<SelectedProduct, Long> {
}
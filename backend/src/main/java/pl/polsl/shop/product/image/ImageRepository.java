package pl.polsl.shop.product.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //todo add name to all beans
interface ImageRepository extends JpaRepository<Image, Long> {
}
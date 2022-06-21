package pl.polsl.shop.product.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.shop.product.Product;

import java.util.List;

@Repository //todo add name to all beans
interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findImagesByProduct_Id(Long product_id);

    Image findImageByImageURI(String imageUri);
}
package pl.polsl.shop.product.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.product.Product;

import java.util.List;

@Service
public class ImageService {
    private ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> getImagesOf(Long productId) {
        return this.imageRepository.findImagesByProduct_Id(productId);
    }

    public List<Image> addImageOf(Product product, String imageUri) {
        Image image = new Image();
        image.setImageURI(imageUri);
        image.setProduct(product);
        this.imageRepository.save(image);
        return this.getImagesOf(product.getId());
    }

    public List<Image> deleteImageOf(Long productId, String imageUri) {
        Image image = this.imageRepository.findImageByImageURI(imageUri);
        this.imageRepository.delete(image);
        return this.getImagesOf(productId);
    }
}

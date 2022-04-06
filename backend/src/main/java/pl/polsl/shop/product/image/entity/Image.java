package pl.polsl.shop.product.image.entity;

import pl.polsl.shop.product.entity.Product;

import javax.persistence.*;

@Entity(name = "Image")
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @Column(name = "image_uri", nullable = false)
    private String imageURI;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public String getImageURI() {
        return imageURI;
    }

    public void setImageURI(String imageURI) {
        this.imageURI = imageURI;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}

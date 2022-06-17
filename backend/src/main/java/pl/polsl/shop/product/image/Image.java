package pl.polsl.shop.product.image;

import pl.polsl.shop.product.Product;

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
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "image_uri", nullable = false)
    private String imageURI;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

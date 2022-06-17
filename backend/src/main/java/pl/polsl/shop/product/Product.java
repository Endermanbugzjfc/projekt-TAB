package pl.polsl.shop.product;

import pl.polsl.shop.product.rest.ProductDTO;

import javax.persistence.*;
import java.util.List;

@Table(name="products")
@Entity(name = "Product")
public class Product {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "producer", nullable = false)
    private String producer;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "category", nullable = false)
    private ProductCategory category;

    @Column(name = "number_of_items_in_stock", nullable = false)
    private int availableInStock;

    @Column(name = "purchase_price", nullable = false)
    private double purchasePrice;

    @Column(name = "retail_price", nullable = false)
    private double retailPrice;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="product_id")
    private List<ProductRestock> restock;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProducer() {
        return this.producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductCategory getCategory() {
        return this.category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public int getAvailableInStock() {
        return this.availableInStock;
    }

    public void setAvailableInStock(int availableInStock) {
        this.availableInStock = availableInStock;
    }

    public double getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public double getRetailPrice() {
        return this.retailPrice;
    }

    public void setRetailPrice(double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public List<ProductRestock> getRestock() {
        return this.restock;
    }

    public void setRestock(List<ProductRestock> restock) {
        this.restock = restock;
    }

    @Transient
    public static Product fromDTO(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.name());
        product.setProducer(productDTO.producer());
        product.setDescription(productDTO.description());
        product.setCategory(productDTO.category());
        product.setAvailableInStock(productDTO.inStock());
        product.setPurchasePrice(productDTO.purchasePrice());
        product.setRetailPrice(productDTO.retailPrice());
        return product;
    }
}

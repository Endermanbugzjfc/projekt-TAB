package pl.polsl.shop.product;

import javax.persistence.*;

@Entity(name = "products")
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

    @Column(name = "number_of_items_in_stock", nullable = false)
    private int availableInStock;

    @Column(name = "purchase_price", nullable = false)
    private double purchasePrice;

    @Column(name = "retail_price", nullable = false)
    private double retailPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAvailableInStock() {
        return availableInStock;
    }

    public void setAvailableInStock(int availableInStock) {
        this.availableInStock = availableInStock;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(double retailPrice) {
        this.retailPrice = retailPrice;
    }
}

package pl.polsl.shop.product;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name="product_restock")
@Entity(name = "ProductRestock")
public class ProductRestock {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "restock_sequence"
    )
    @SequenceGenerator(
            name = "restock_sequence",
            sequenceName = "restock_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "purchase_price", nullable = false)
    private double purchasePrice;

    @Column(name = "restock_date", nullable = false)
    private LocalDate purchaseDate;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductRestock() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}

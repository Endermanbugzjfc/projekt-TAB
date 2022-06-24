package pl.polsl.shop.product;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name="product_restock")
@Entity(name = "ProductRestock")
public class ProductRestock {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
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
}

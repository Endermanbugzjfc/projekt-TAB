package pl.polsl.shop.cart.entity;

import pl.polsl.shop.product.entity.Product;

import javax.persistence.*;

@Entity(name = "SelectedProduct")
@Table(name = "shopping_cart_products")
public class SelectedProduct {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cart_products_sequence"
    )
    @SequenceGenerator(
            name = "cart_products_sequence",
            sequenceName = "cart_products_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id", nullable = false)
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShoppingCart getCart() {
        return this.shoppingCart;
    }

    public void setShoppingCart(ShoppingCart  shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Product getProductId() {
        return this.product;
    }

    public void setProductId(Product product) {
        this.product = product;
    }
}

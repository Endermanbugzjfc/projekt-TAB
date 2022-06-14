package pl.polsl.shop.cart;

import pl.polsl.shop.cart.rest.SelectedProductDto;
import pl.polsl.shop.cart.rest.ShoppingCartDto;
import pl.polsl.shop.product.Product;

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

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id", nullable = false)
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public SelectedProduct(Product product) {
        this.product = product;
    }

    public SelectedProduct() {

    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ShoppingCart getCart() {
        return this.shoppingCart;
    }

    public void setCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Transient
    public static SelectedProduct fromDto(SelectedProductDto selectedProductDto) {
        SelectedProduct selectedProduct = new SelectedProduct();
        selectedProduct.setQuantity(selectedProductDto.quantity());
        selectedProduct.setCart(ShoppingCart.fromDto(selectedProductDto.shoppingCartDto()));
        return selectedProduct;
    }
}
package pl.polsl.shop.cart;

import pl.polsl.shop.cart.rest.ShoppingCartDto;
import pl.polsl.shop.product.Product;
import pl.polsl.shop.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "shopping_carts")
public class ShoppingCart {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cart_sequence"
    )
    @SequenceGenerator(
            name = "cart_sequence",
            sequenceName = "cart_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name = "number_of_items", nullable = false)
    private int itemsAmount;

    @OneToMany(mappedBy = "shoppingCart", cascade = CascadeType.ALL)
    private List<SelectedProduct> selectedProducts;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public int getItemsAmount() {
        return itemsAmount;
    }

    public void setItemsAmount(int itemsAmount) {
        this.itemsAmount = itemsAmount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<SelectedProduct> getSelectedProducts() {
        return selectedProducts;
    }

    public void setSelectedProducts(List<SelectedProduct> selectedProducts) {
        this.selectedProducts = selectedProducts;
    }

    public void addProduct(Product product) {
        this.selectedProducts.add(new SelectedProduct(product));
        this.itemsAmount++;
    }

    public boolean removeProduct(SelectedProduct selectedProduct) {
        boolean removed = this.selectedProducts.remove(selectedProduct);
        if (removed) {
            selectedProduct.setCart(null);
            this.itemsAmount--;
        }
        return removed;
    }

    public static ShoppingCart fromDto(ShoppingCartDto shoppingCartDto) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCreationDate(shoppingCartDto.creationDate());
        shoppingCart.setSelectedProducts(shoppingCartDto.selectedProducts());
        shoppingCart.setItemsAmount(shoppingCartDto.items());
        return shoppingCart;
    }
}

package pl.polsl.shop.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.shop.product.Product;
import pl.polsl.shop.user.User;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

@Service("shoppingCartService")
public class ShoppingCartService {
    private SelectedProductRepository selectedProductRepository;
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    public ShoppingCartService(
            ShoppingCartRepository shoppingCartRepository,
            SelectedProductRepository selectedProductRepository
    ) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.selectedProductRepository = selectedProductRepository;
    }

    private ShoppingCart createShoppingCart(User user) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCreationDate(LocalDate.now());
        shoppingCart.setSelectedProducts(Collections.emptyList());
        shoppingCart.setUser(user);
        user.setShoppingCart(shoppingCart);
        shoppingCart.setItemsAmount(0);
        return shoppingCartRepository.save(shoppingCart);
    }

    public ShoppingCart getCartFor(User user) {
        return this.shoppingCartRepository.findShoppingCartByUser_Id(user).orElseGet(
                () -> this.createShoppingCart(user)
        );
    }

    public ShoppingCart getCart(Long cartId) {
        Optional<ShoppingCart> cart = this.shoppingCartRepository.findById(cartId);
        if (cart.isPresent()) {
            ShoppingCart shoppingCart = cart.get();
            long days = Duration.between(shoppingCart.getCreationDate(), LocalDate.now()).toDays();
            if (days >= 7) {
                throw new ExpiredCartException(
                        "Cart created on " + shoppingCart.getCreationDate() + " is already expired"
                );
            }
            return shoppingCart;
        } else {
            throw new NotSuchCartException("Cannot find shopping cart with id: " + cartId);
        }
    }

    public ShoppingCart addToCart(Long cartId, Product product, Integer quantity) {
        ShoppingCart shoppingCart = this.getCart(cartId);
        shoppingCart.addProduct(product, quantity);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    public ShoppingCart removeFromCart(Long cartId, Product product) {
        ShoppingCart shoppingCart = this.getCart(cartId);
        SelectedProduct selectedProduct = this.selectedProductRepository.findSelectedProductByProduct_Id(product);
        boolean removed = shoppingCart.removeProduct(selectedProduct);
        if (removed) {
            this.shoppingCartRepository.save(shoppingCart);
        } else {
            throw new ProductNotInCartException(
                    "Product " + product.getName() + " is not present in the given cart"
            );
        }
        return shoppingCart;
    }
}

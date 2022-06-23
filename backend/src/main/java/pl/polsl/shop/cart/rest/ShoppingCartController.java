package pl.polsl.shop.cart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.product.ProductService;
import pl.polsl.shop.user.UserService;

@RestController
@RequestMapping(path = "/cart")
public class ShoppingCartController {
    private ShoppingCartService shoppingCartService;
    private UserService userService;
    private ProductService productService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService, UserService userService, ProductService productService){
        this.shoppingCartService = shoppingCartService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/user/{id}")
    public ShoppingCartDto getCartForUser(@PathVariable("id") Long userId){
        return ShoppingCartDto.fromShoppingCart(this.shoppingCartService.getCartFor(userService.getUser(userId)));
    }

    @GetMapping("/{cartId}")
    public ShoppingCartDto getCart(@PathVariable("cartId") Long cartId){
        return ShoppingCartDto.fromShoppingCart(this.shoppingCartService.getCart(cartId));
    }

    @PutMapping("/{cartId}")
    public ShoppingCartDto updateShoppingCart(@PathVariable("cartId") Long cartId, @RequestBody Long productId, @RequestBody Integer quantity){
        return ShoppingCartDto.fromShoppingCart(this.shoppingCartService.addToCart(cartId, productService.getProductData(productId), quantity));
    }

    @DeleteMapping("/{cartId}")
    public ShoppingCartDto deleteFromShoppingCart(@PathVariable("cartId") Long cartId, @RequestBody Long productId){
        return ShoppingCartDto.fromShoppingCart(this.shoppingCartService.removeFromCart(cartId, productService.getProductData(productId)));
    }
}
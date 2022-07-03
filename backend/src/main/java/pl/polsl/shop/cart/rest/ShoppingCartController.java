package pl.polsl.shop.cart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.cart.CartException;
import pl.polsl.shop.cart.ShoppingCartService;
import pl.polsl.shop.order.rest.CartActionResult;
import pl.polsl.shop.order.rest.CartUpdateDto;
import pl.polsl.shop.product.ProductService;
import pl.polsl.shop.user.UserException;
import pl.polsl.shop.user.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/cart")
public class ShoppingCartController {
    private ShoppingCartService shoppingCartService;
    private UserService userService;
    private ProductService productService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService, UserService userService, ProductService productService) {
        this.shoppingCartService = shoppingCartService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/user/{id}")
    public CartActionResult getCartForUser(@PathVariable("id") Long userId) {
        boolean success = true;
        String message = null;
        ShoppingCartDto cartDto = null;
        try {
            cartDto = ShoppingCartDto.fromShoppingCart(this.shoppingCartService.getCartFor(userService.getUser(userId)));
        } catch (UserException e) {
            success = false;
            message = e.getMessage();
        }
        return new CartActionResult(success, cartDto, message);
    }

    @GetMapping("/{cartId}")
    public CartActionResult getCart(@PathVariable("cartId") Long cartId) {
        boolean success = true;
        String message = null;
        ShoppingCartDto cartDto = null;
        try {
            cartDto = ShoppingCartDto.fromShoppingCart(this.shoppingCartService.getCart(cartId));
        } catch (CartException e) {
            success = false;
            message = e.getMessage();
        }
        return new CartActionResult(success, cartDto, message);
    }

    @PutMapping("/{cartId}")
    public CartActionResult updateShoppingCart(@PathVariable("cartId") Long cartId, @RequestBody CartUpdateDto cartUpdateDto) {
        boolean success = true;
        String message = null;
        ShoppingCartDto cartDto = null;
        try {
            cartDto = ShoppingCartDto.fromShoppingCart(
                    this.shoppingCartService.addToCart(
                            cartId,
                            productService.getProductData(cartUpdateDto.productId()),
                            cartUpdateDto.quantity()
                    )
            );
        } catch (CartException e) {
            success = false;
            message = e.getMessage();
        }
        return new CartActionResult(success, cartDto, message);
    }

    @DeleteMapping("/{cartId}/{productId}")
    public CartActionResult deleteFromShoppingCart(@PathVariable("cartId") Long cartId, @PathVariable("productId") Long productId) {
        boolean success = true;
        String message = null;
        ShoppingCartDto cartDto = null;
        try {
            cartDto = ShoppingCartDto.fromShoppingCart(this.shoppingCartService.removeFromCart(cartId, productService.getProductData(productId)));
        } catch (CartException e) {
            success = false;
            message = e.getMessage();
        }
        return new CartActionResult(success, cartDto, message);
    }
}
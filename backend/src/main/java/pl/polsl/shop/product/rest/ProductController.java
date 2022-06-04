package pl.polsl.shop.product.rest;

import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.product.Product;
import pl.polsl.shop.product.ProductCategory;
import pl.polsl.shop.product.ProductService;

import java.util.List;

@RestController
@RequestMapping(path = "/product")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/report/{productId}")
    public List<ProductReportDTO> getReportsFor(@PathVariable("productId") Long productId) {
        return this.productService.getReportsFor(productId);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/report/all")
    public List<ProductReportDTO> getAllReports() {
        return this.productService.getAllReports();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO) {
        Product newProduct = this.productService.addProduct(productDTO);
        return ProductDTO.fromProduct(newProduct);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{category}")
    public List<ProductDTO> listByCategory(@PathVariable("category") ProductCategory category) {
        return this.productService.getProductsByCategory(category).stream()
                .map(ProductDTO::fromProduct)
                .toList();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/price")
    public ProductDTO updatePrice(@RequestBody ProductPriceUpdateDTO priceUpdateDTO) {
        Product product = this.productService.updateRetailPrice(priceUpdateDTO);
        return ProductDTO.fromProduct(product);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{productId}")
    public ProductDTO getProduct(@PathVariable("productId") Long productId) {
        Product product = this.productService.getProductData(productId);
        return ProductDTO.fromProduct(product);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/category")
    public List<ProductCategory> listAllCategories() {
        return this.productService.getAllCategories();
    }

}

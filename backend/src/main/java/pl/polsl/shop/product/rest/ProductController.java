package pl.polsl.shop.product.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.shop.product.Product;
import pl.polsl.shop.product.ProductCategory;
import pl.polsl.shop.product.ProductService;
import pl.polsl.shop.product.image.Image;
import pl.polsl.shop.product.image.ImageService;

import java.util.List;

@RestController
@RequestMapping(path = "/product")
public class ProductController {
    private ProductService productService;
    private ImageService imageService;

    @Autowired
    public ProductController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
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

    @RequestMapping(method = RequestMethod.POST, path = "/price")
    public List<ProductDTO> listByPrice(@RequestBody ProductPriceQueryDTO priceQueryDTO) {
        return this.productService.getByRetailPrice(priceQueryDTO).stream()
                .map(ProductDTO::fromProduct)
                .toList();
    }

    @RequestMapping(method = RequestMethod.POST, path = "/price/{category}")
    public List<ProductDTO> listByPriceAndCategory(
            @RequestBody ProductPriceQueryDTO priceQueryDTO,
            @PathVariable("category") ProductCategory productCategory
    ) {
        return this.productService.getByRetailPriceAndCategory(priceQueryDTO, productCategory).stream()
                .map(ProductDTO::fromProduct)
                .toList();
    }

    @RequestMapping(method = RequestMethod.GET, path = "{productId}/images")
    public List<String> getImagesOf(@PathVariable("productId") Long productId) {
        return this.imageService.getImagesOf(productId).stream()
                .map(Image::getImageURI)
                .toList();
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

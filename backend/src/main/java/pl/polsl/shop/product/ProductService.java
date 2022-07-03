package pl.polsl.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.shop.order.OrderService;
import pl.polsl.shop.order.OrderedProduct;
import pl.polsl.shop.product.rest.*;

import java.time.LocalDate;
import java.util.List;

@Service("productService")
public class ProductService { //todo implement
    private ProductRepository productRepository;
    private OrderService orderService;

    @Autowired
    public ProductService(ProductRepository productRepository, OrderService orderService) {
        this.productRepository = productRepository;
        this.orderService = orderService;
    }

    public Product addProduct(ProductDTO productDTO) {
        return this.productRepository.save(Product.fromDTO(productDTO));
    }

    public List<Product> getProductsByCategory(ProductCategory productCategory) { //GET /product/{category}
        return this.productRepository.findAllByCategoryEquals(productCategory);
    }

    public Product updateProductPrice(ProductPriceUpdateDTO priceUpdateDTO) {
        Product product = this.productRepository.getById(priceUpdateDTO.productId());
        product.setRetailPrice(priceUpdateDTO.newPrice());
        return this.productRepository.save(product);
    }

    public List<Product> getByRetailPrice(ProductPriceQueryDTO productPriceQueryDTO) {//PUT /product/price
        return this.productRepository.findAllByRetailPriceBetween(
                productPriceQueryDTO.min(), productPriceQueryDTO.max()
        );
    }

    public List<Product> getByRetailPriceAndCategory(ProductPriceQueryDTO productPriceQueryDTO, ProductCategory category) {//PUT /product/price
        return this.productRepository.findAllByRetailPriceBetween(
                        productPriceQueryDTO.min(), productPriceQueryDTO.max()
                ).stream()
                .filter(product -> product.getCategory().equals(category))
                .toList();
    }

    @Transactional
    public void restock(List<ProductRestockDTO> restockData) {
        restockData.forEach(productRestockDTO -> {
            Product product = this.productRepository.getById(productRestockDTO.productId());
            product.setAvailableInStock(productRestockDTO.newQuantity());
            this.productRepository.save(product);
        });
    }

    public Product getProductData(Long productId) {
        return this.productRepository.getById(productId);
    }

    public List<ProductCategory> getAllCategories() {
        return List.of(ProductCategory.values());
    }

    public List<ProductReportDTO> getReportsFor(Long productId) {
        Product product = this.productRepository.getById(productId);
        return this.getReportsFor(List.of(product));
    }

    public List<ProductReportDTO> getAllReports() {
        return this.getReportsFor(this.productRepository.findAll());
    }

    private List<ProductReportDTO> getReportsFor(List<Product> products) {
        return products.stream()
                .map(product -> {
                    List<OrderedProduct> productOrders = this.orderService.getAllSalesOf(product);
                    double totalIncome = productOrders.stream()
                            .mapToDouble(orderedProduct -> orderedProduct.getPrice() * orderedProduct.getQuantity())
                            .sum();
                    double totalExpense = product.getRestock().stream()
                            .mapToDouble(restock -> restock.getPurchasePrice() * restock.getQuantity())
                            .sum();
                    return new ProductReportDTO(product.getId(), product.getName(), totalIncome, totalExpense);
                }).toList();
    }
}

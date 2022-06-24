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
    private RestockRepository restockRepository;
    private OrderService orderService;

    @Autowired
    public ProductService(ProductRepository productRepository, RestockRepository restockRepository, OrderService orderService) {
        this.productRepository = productRepository;
        this.restockRepository = restockRepository;
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
        return this.productRepository.findAllByRetailPriceBetween(productPriceQueryDTO.min(), productPriceQueryDTO.max()).stream()
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
        return this.getReportsFor(List.of(product), LocalDate.of(1900, 1, 1), LocalDate.now());
    }

    public List<ProductReportDTO> getAllReports() {
        return this.getReportsFor(this.productRepository.findAll(), LocalDate.of(1900, 1, 1), LocalDate.now());
    }

    public List<ProductReportDTO> getReportsBetweenDates(LocalDate start, LocalDate end) {
        return this.getReportsFor(this.productRepository.findAll(), start, end);
    }

    private List<ProductReportDTO> getReportsFor(List<Product> products, LocalDate start, LocalDate end) {
        return products.stream()
                .map(product -> {
                    List<OrderedProduct> productOrders = this.orderService.getAllSalesOf(product).stream()
                            .filter(orderedProduct -> orderedProduct.getOrder().getOrderDate().isBefore(end)
                                    && orderedProduct.getOrder().getOrderDate().isAfter(start))
                            .toList();
                    double totalIncome = productOrders.stream()
                            .mapToDouble(orderedProduct -> orderedProduct.getPrice() * orderedProduct.getQuantity())
                            .sum();
                    double totalExpense = this.restockRepository.findProductRestocksByProduct(product).stream()
                            .mapToDouble(restock -> restock.getPurchasePrice() * restock.getQuantity())
                            .sum();
                    return new ProductReportDTO(product.getId(), product.getName(), totalIncome, totalExpense);
                }).toList();
    }
}

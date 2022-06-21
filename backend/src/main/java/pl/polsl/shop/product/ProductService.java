package pl.polsl.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.shop.order.OrderService;
import pl.polsl.shop.order.OrderedProduct;
import pl.polsl.shop.product.rest.ProductDTO;
import pl.polsl.shop.product.rest.ProductPriceUpdateDTO;
import pl.polsl.shop.product.rest.ProductReportDTO;
import pl.polsl.shop.product.rest.ProductRestockDTO;

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

    public Product updateRetailPrice(ProductPriceUpdateDTO productPriceUpdateDto) {//PUT /product/price
        Product product = this.productRepository.getById(productPriceUpdateDto.productId());
        product.setRetailPrice(productPriceUpdateDto.newPrice());
        return this.productRepository.save(product);
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

package pl.polsl.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.shop.order.OrderReportDto;
import pl.polsl.shop.order.OrderService;
import pl.polsl.shop.order.OrderedProduct;

import java.util.Collections;
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

    public ProductDTO getProductData(Long productId) {
        Product product = this.productRepository.getById(productId);
        return ProductDTO.fromProduct(product);
    }

    public List<ProductCategory> getAllCategories() {
        return List.of(ProductCategory.values());
    }

    public List<ProductReportDTO> getReportsFor(List<Product> products) {
        return products.stream()
                .map(product -> {
                    List<OrderedProduct> productOrders = this.orderService.getAllSalesOf(product);
                    double totalIncome = productOrders.stream()
                            .mapToDouble(orderedProduct -> orderedProduct.getPrice() * orderedProduct.getQuantity())
                            .sum();
                    double totalExpense = Double.MAX_VALUE; //todo requires restock history
                    return new ProductReportDTO(product.getId(), product.getName(), totalIncome, totalExpense);
                }).toList();
        //todo implement. I think it needs another table in the database
    }
}

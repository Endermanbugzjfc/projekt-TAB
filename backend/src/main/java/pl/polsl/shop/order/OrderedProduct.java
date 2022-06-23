package pl.polsl.shop.order;

import pl.polsl.shop.order.rest.OrderedProductDto;
import pl.polsl.shop.product.Product;

import javax.persistence.*;

@Entity(name = "OrderedProduct")
@Table(name = "order_product")
public class OrderedProduct {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_product_sequence"
    )
    @SequenceGenerator(
            name = "order_product_sequence",
            sequenceName = "order_product_sequence",
            allocationSize = 1
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "item_quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "price", nullable = false)
    private double price;

    public OrderedProduct(Order order, Product product) {
        this.order = order;
        this.product = product;
        this.price = product.getRetailPrice();
        this.quantity = 0;
    }

    public OrderedProduct() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Transient
    public static OrderedProduct fromDto(OrderedProductDto orderedProductDto){
        OrderedProduct orderedProduct = new OrderedProduct();
        orderedProduct.setQuantity(orderedProductDto.quantity());
        orderedProduct.setProduct(Product.fromDTO(orderedProductDto.product()));
        orderedProduct.setPrice(orderedProductDto.price());
        return orderedProduct;
    }
}
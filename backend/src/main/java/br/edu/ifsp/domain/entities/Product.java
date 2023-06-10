package br.edu.ifsp.domain.entities;

import br.edu.ifsp.domain.dtos.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;
    private String description;
    private Double costPrice;
    private Double salePrice;
    private String provider;

    @OneToMany(mappedBy = "id")
    private List<Order> orders;

    public Product(ProductDTO productDTO) {
        name = productDTO.getName();
        description = productDTO.getDescription();
        costPrice = productDTO.getCostPrice();
        salePrice = productDTO.getSalePrice();
        provider = productDTO.getProvider();
        orders = productDTO.getOrders();
    }
}

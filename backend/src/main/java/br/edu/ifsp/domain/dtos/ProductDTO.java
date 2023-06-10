package br.edu.ifsp.domain.dtos;

import br.edu.ifsp.domain.entities.Order;
import br.edu.ifsp.domain.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Integer id;
    private String name;
    private String description;
    private Double costPrice;
    private Double salePrice;
    private String provider;
    private List<Order> orders;

    public ProductDTO(Product entity) {
        id = entity.getId();
        name = entity.getName();
        description = entity.getDescription();
        costPrice = entity.getCostPrice();
        salePrice = entity.getSalePrice();
        provider = entity.getProvider();
        orders = entity.getOrders();
    }
}

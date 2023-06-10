package br.edu.ifsp.domain.dtos;

import br.edu.ifsp.domain.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Integer id;
    private Integer productId;
    private String orderStatus;
    private Integer customerId;
    private Double totalValue;

    public OrderDTO(Order entity) {
        id = entity.getId();
        productId = entity.getProduct().getId();
        orderStatus = entity.getOrderStatus();
        customerId = entity.getCustomer().getId();
        totalValue = entity.getTotalValue();
    }
}

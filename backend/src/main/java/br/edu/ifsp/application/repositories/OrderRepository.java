package br.edu.ifsp.application.repositories;

import br.edu.ifsp.domain.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Modifying
    @Query(nativeQuery = true, value = "UPDATE orders SET order_status = :orderStatusToUpdate, " +
            "total_value = :totalValueToUpdate WHERE id = :orderId")
    public void updateOrderById(Integer orderId, String orderStatusToUpdate, Double totalValueToUpdate);
}

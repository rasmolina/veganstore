package br.edu.ifsp.application.controllers;

import br.edu.ifsp.domain.dtos.OrderDTO;
import br.edu.ifsp.domain.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<?> allOrder() {
        return ResponseEntity.ok().body(orderService.findOrders());
    }

    @PostMapping("/save")
    public ResponseEntity<String> orderToAdd(@RequestBody OrderDTO orderDTO) {
        orderService.addOrder(orderDTO);
        return ResponseEntity.ok().body("Pedido adicionado com sucesso!");
    }

    @GetMapping("/{orderToFind}")
    public ResponseEntity<?> orderToFind(@PathVariable(value = "orderToFind") Integer orderId) {
        return ResponseEntity.ok().body(orderService.findById(orderId));
    }

    @PutMapping("/{orderId}/update")
    public ResponseEntity<String> orderToUpdate(@PathVariable(value = "orderId") Integer orderId,
                                                @RequestBody OrderDTO orderDTO) {
        orderService.updateOrder(orderId, orderDTO);
        return ResponseEntity.ok().body("Pedido alterado com sucesso!");
    }

    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<String> orderToDelete(@PathVariable(value = "orderId") Integer orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok().body("Pedido removido com sucesso!");
    }
}

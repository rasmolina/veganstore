package br.edu.ifsp.domain.services;

import br.edu.ifsp.application.repositories.CustomerRepository;
import br.edu.ifsp.application.repositories.OrderRepository;
import br.edu.ifsp.application.repositories.ProductRepository;
import br.edu.ifsp.domain.dtos.OrderDTO;
import br.edu.ifsp.domain.entities.Customer;
import br.edu.ifsp.domain.entities.Order;
import br.edu.ifsp.domain.entities.Product;
import br.edu.ifsp.domain.services.exceptions.CustomerDoesNotExistException;
import br.edu.ifsp.domain.services.exceptions.OrderDoesNotExistException;
import br.edu.ifsp.domain.services.exceptions.ProductDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addOrder(OrderDTO orderDTO) {
        Optional<Customer> customerToFind = customerRepository.findById(orderDTO.getCustomerId());
        if (customerToFind.isEmpty())
            throw new CustomerDoesNotExistException("Cliente não encontrado no sistema! Tente novamente");

        Optional<Product> productToFind = productRepository.findById(orderDTO.getProductId());
        if (productToFind.isEmpty())
            throw new ProductDoesNotExistException("Produto não encontrado no sistema! Tente novamente");


        Order orderToSave = new Order(orderDTO);
        orderToSave.setCustomer(customerToFind.get());
        orderToSave.setProduct(productToFind.get());

        orderRepository.save(orderToSave);
    }

    @Transactional(readOnly = true)
    public Order findById(Integer id) {
        Optional<Order> orderToFind = orderRepository.findById(id);

        if (orderToFind.isEmpty())
            throw new OrderDoesNotExistException("Pedido não encontrado no sistema! Tente novamente");

        return orderToFind.get();
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> findOrders() {
        List<Order> orderssDB = orderRepository.findAll();

        List<OrderDTO> orders = new ArrayList<>();
        for (Order order : orderssDB) {
            orders.add(new OrderDTO(order));
        }
        return orders;
    }

    @Transactional
    public void updateOrder(Integer orderId, OrderDTO orderDTO) {
        Optional<Order> orderToFind = orderRepository.findById(orderId);

        if (orderToFind.isEmpty())
            throw new OrderDoesNotExistException("Pedido não encontrado no sistema! Tente novamente");

        Optional<Customer> customerToFind = customerRepository.findById(orderDTO.getCustomerId());
        if (customerToFind.isEmpty())
            throw new CustomerDoesNotExistException("Cliente não encontrado no sistema! Tente novamente");

        Optional<Product> productToFind = productRepository.findById(orderDTO.getProductId());
        if (productToFind.isEmpty())
            throw new ProductDoesNotExistException("Produto não encontrado no sistema! Tente novamente");

        orderRepository.updateOrderById(
                orderId,
                orderDTO.getOrderStatus(),
                orderDTO.getTotalValue()
        );
    }

    @Transactional
    public void deleteOrder(Integer orderId) {
        Optional<Order> orderToFind = orderRepository.findById(orderId);

        if (orderToFind.isEmpty())
            throw new OrderDoesNotExistException("Pedido não encontrado no sistema! Tente novamente");

        orderRepository.delete(orderToFind.get());
    }
}

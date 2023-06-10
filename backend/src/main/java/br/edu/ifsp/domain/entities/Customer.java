package br.edu.ifsp.domain.entities;

import br.edu.ifsp.domain.dtos.CustomerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String cpf;

    private String name;

    @OneToMany(mappedBy = "id")
    private List<Order> orders;

    public Customer(CustomerDTO customerDTO) {
        email = customerDTO.getEmail();
        cpf = customerDTO.getCpf();
        name = customerDTO.getName();
        orders = customerDTO.getOrders();
    }
}

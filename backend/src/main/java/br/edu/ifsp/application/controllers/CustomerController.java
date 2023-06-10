package br.edu.ifsp.application.controllers;

import br.edu.ifsp.domain.dtos.CustomerDTO;
import br.edu.ifsp.domain.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity<?> allCustomer() {
        return ResponseEntity.ok().body(customerService.findCustomers());
    }
    @PostMapping("/save")
    public ResponseEntity<String> customerToAdd(@RequestBody CustomerDTO customerDTO) {
        customerService.addCustomer(customerDTO);
        return ResponseEntity.ok().body("Cliente adicionado com sucesso!");
    }

    @GetMapping("/{customerToFind}")
    public ResponseEntity<?> customerToFind(@PathVariable(value = "customerToFind") String customerToFind) {
        return ResponseEntity.ok().body(customerService.findByCPFOrEmail(customerToFind));
    }
}

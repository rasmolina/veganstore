package br.edu.ifsp.domain.services;

import br.edu.ifsp.application.repositories.CustomerRepository;
import br.edu.ifsp.domain.dtos.CustomerDTO;
import br.edu.ifsp.domain.entities.Customer;
import br.edu.ifsp.domain.services.exceptions.CustomerAlreadyExistException;
import br.edu.ifsp.domain.services.exceptions.CustomerDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public void addCustomer(CustomerDTO customerDTO) {
        validateCustomer(customerDTO);

        Customer customer = new Customer(customerDTO);
        customerRepository.save(customer);
    }

    @Transactional(readOnly = true)
    public List<CustomerDTO> findCustomers() {
        List<Customer> customersDB = customerRepository.findAll();

        List<CustomerDTO> customers = new ArrayList<>();
        for (Customer customer : customersDB) {
            customers.add(new CustomerDTO(customer));
        }
        return customers;
    }

    private void validateCustomer(CustomerDTO customerDTO) {
        Customer customerToFindCpf = customerRepository.findCustomerByCpf(customerDTO.getCpf());
        Customer customerToFindEmail = customerRepository.findCustomerByEmail(customerDTO.getEmail());

        if (customerToFindCpf != null) {
            throw new CustomerAlreadyExistException("Cliente já existente! Para mais informações procure pelo " +
                    "CPF " + customerToFindCpf.getCpf());
        }

        if (customerToFindEmail != null) {
            throw new CustomerAlreadyExistException("Cliente já existente! Para mais informações procure pelo " +
                    "email " + customerDTO.getEmail());
        }
    }

    @Transactional(readOnly = true)
    public List<CustomerDTO> findByCPFOrEmail(String stringToFInd) {
        List<CustomerDTO> list = new ArrayList<>();
        Customer customerToFind = customerRepository.queryToFindByCPFOrEmail(stringToFInd);

        if (customerToFind == null)
            throw new CustomerDoesNotExistException("Cliente não encontrado no sistema! Tente novamente");

        list.add(new CustomerDTO(customerToFind));

        return list;
    }
}

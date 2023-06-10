package br.edu.ifsp.application.repositories;

import br.edu.ifsp.domain.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM customers c WHERE c.cpf LIKE (:stringToFind) OR LOWER(c.email) LIKE LOWER(:stringToFind)")
    public Customer queryToFindByCPFOrEmail(String stringToFind);

    public Customer findCustomerByCpf(String cpf);

    public Customer findCustomerByEmail(String email);
}

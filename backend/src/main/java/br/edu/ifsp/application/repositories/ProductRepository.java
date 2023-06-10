package br.edu.ifsp.application.repositories;

import br.edu.ifsp.domain.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT * FROM products p " +
                    "WHERE LOWER(p.name) LIKE ('%' || :stringToFind || '%') OR " +
                    "LOWER(p.provider) LIKE LOWER('%' || :stringToFind || '%')")
    public List<Product> queryToFindByNameOrProvider(String stringToFind);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE products SET name = :nameToUpdate, " +
            "description = :descriptionToUpdate, cost_price = :costPriceToUpdate, " +
            "sale_price = :salePriceToUpdate, provider = :providerToUpdate " +
            "WHERE id = :productId")
    public void updateProductById(Integer productId, String nameToUpdate, String descriptionToUpdate,
                                  Double costPriceToUpdate, Double salePriceToUpdate, String providerToUpdate);
}

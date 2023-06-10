package br.edu.ifsp.domain.services;

import br.edu.ifsp.application.repositories.ProductRepository;
import br.edu.ifsp.domain.dtos.ProductDTO;
import br.edu.ifsp.domain.entities.Product;
import br.edu.ifsp.domain.services.exceptions.ProductDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public void addProduct(ProductDTO productDTO) {
        Product product = new Product(productDTO);
        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> findByNameOrProvider(String stringToFind) {
        List<Product> productsToFind = productRepository.queryToFindByNameOrProvider(stringToFind);

        if (productsToFind.isEmpty())
            throw new ProductDoesNotExistException("Produto e provedor não encontrados no sistema! Tente novamente");

        List<ProductDTO> products = new ArrayList<>();
        for (Product product : productsToFind) {
            products.add(new ProductDTO(product));
        }
        return products;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> findProducts() {
        List<Product> productsDB = productRepository.findAll();

        List<ProductDTO> products = new ArrayList<>();
        for (Product product : productsDB) {
            products.add(new ProductDTO(product));
        }
        return products;
    }

    @Transactional
    public void updateProduct(Integer productId, ProductDTO productDTO) {
        Optional<Product> productToFind = productRepository.findById(productId);

        if (productToFind.isEmpty())
            throw new ProductDoesNotExistException("Produto não encontrado no sistema! Tente novamente");

        productRepository.updateProductById(
                productId,
                productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getCostPrice(),
                productDTO.getSalePrice(),
                productDTO.getProvider());
    }

    @Transactional
    public void deleteProduct(Integer productId) {
        Optional<Product> productToFind = productRepository.findById(productId);

        if (productToFind.isEmpty())
            throw new ProductDoesNotExistException("Produto não encontrado no sistema! Tente novamente");

        productRepository.delete(productToFind.get());
    }
}

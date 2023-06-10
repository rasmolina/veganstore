package br.edu.ifsp.application.controllers;

import br.edu.ifsp.domain.dtos.ProductDTO;
import br.edu.ifsp.domain.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<String> productToAdd(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);
        return ResponseEntity.ok().body("Produto adicionado com sucesso!");
    }

    @GetMapping("/{productToFind}")
    public ResponseEntity<?> productToFind(@PathVariable(value = "productToFind") String productToFind) {
        return ResponseEntity.ok().body(productService.findByNameOrProvider(productToFind));
    }

    @GetMapping
    public ResponseEntity<?> allProduct() {
        return ResponseEntity.ok().body(productService.findProducts());
    }

    @PutMapping("/{productId}/update")
    public ResponseEntity<String> productToUpdate(@PathVariable(value = "productId") Integer productId,
                                                  @RequestBody ProductDTO productDTO) {
        productService.updateProduct(productId, productDTO);
        return ResponseEntity.ok().body("Produto alterado com sucesso!");
    }

    @DeleteMapping("/{productId}/delete")
    public ResponseEntity<String> productToDelete(@PathVariable(value = "productId") Integer productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok().body("Produto removido com sucesso!");
    }
}

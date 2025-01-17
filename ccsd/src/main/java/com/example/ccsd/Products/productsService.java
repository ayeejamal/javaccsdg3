package com.example.ccsd.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class productsService {

    @Autowired
    private productsRepository ProductsRepository;

    public List<products> getAllProducts() {
        return ProductsRepository.findAll();
    }

    public Optional<products> getProductsById(String id) {
        return ProductsRepository.findById(id);
    }

    public products addProducts(products product) {
        return ProductsRepository.save(product);
    }

    public products updateProducts(String id, products ProductsDetail) {
        Optional<products> product = ProductsRepository.findById(id);
        if (product.isPresent()) {
            products productToUpdate = product.get();
            productToUpdate.setTitle(ProductsDetail.getTitle()); // Update fields as necessary
            productToUpdate.setPostSlug(ProductsDetail.getPostSlug());
            productToUpdate.setPostShortDescription(ProductsDetail.getPostShortDescription());
            productToUpdate.setTag(ProductsDetail.getTag());
            productToUpdate.setPlace(ProductsDetail.getPlace());
            productToUpdate.setDateProduct(ProductsDetail.getDateProduct());
            productToUpdate.setStatus(ProductsDetail.getStatus());
            productToUpdate.setImageStore64String(ProductsDetail.getImageStore64String());

            return ProductsRepository.save(productToUpdate); // Save the updated product
        }

        return null; // Return null if the product doesn't exist
    }

    public void deleteProducts(String id) {
        System.out.println("Attempting to delete product with ID: " + id);
        ProductsRepository.deleteById(id);
    }

}
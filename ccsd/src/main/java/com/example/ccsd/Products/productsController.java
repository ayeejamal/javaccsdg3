package com.example.ccsd.Products;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/products")
public class productsController {
    
    @Autowired
    private productsService productsService;

    @GetMapping
    public List<products> getAllProducts() {
        List<products> productsList = productsService.getAllProducts();  // Get all products

        // Process each product in the list
        return productsList.stream()
                .map(product -> {
                    // Add Base64 encoded image to each product
                    product.setImageStore64String(product.getImageAsBase64());
                    return product;
                })
                .collect(Collectors.toList());  // Collect the processed products back into a list
    }


    @GetMapping("/{id}")
    public ResponseEntity<products> getProductskById(@PathVariable String id) {
        return productsService.getProductsById(id) // Get products by slug
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        }

    // add product based on the 
    @PostMapping
    public ResponseEntity<Map<String, Object>> addProduct(
                @RequestParam("title") String title,
                @RequestParam("postSlug") String postSlug,
                @RequestParam("postShortDescription") String postShortDescription,
                @RequestParam("tag") String tag,
                @RequestParam("place") String place,
                @RequestParam("date") String date,
                @RequestParam("status") String status,
                @RequestParam("image") MultipartFile image) throws IOException {

            // Convert the image to a byte array
            byte[] imageBytes = image.getBytes();  // Get image data

            // Create a new Product instance
            products product = new products();
            product.setTitle(title);
            product.setPostSlug(postSlug);
            product.setPostShortDescription(postShortDescription);
            product.setTag(tag);
            product.setPlace(place);
            product.setDateProduct(date);
            product.setStatus(status);
            product.setImageStore(imageBytes);  // Store image as byte array

            // Save the product in MongoDB
            products savedProduct = productsService.addProducts(product);

            // Return a response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("product", savedProduct);
            
            return ResponseEntity.ok(response);
    }

//     @PutMapping("/{id}")
//     public ResponseEntity<products> updateProducts(@PathVariable String id, @RequestBody products ProductsDetail) {
//         products updatedProducts = productsService.updateProducts(id, ProductsDetail);
//         if (updatedProducts != null) {
//             return ResponseEntity.ok(updatedProducts);
//         }
//         return ResponseEntity.notFound().build();
//     }

    /**
     * New endpoint to upload an image for a product by ID.
     */
    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Map<String, Object>> uploadProductImage(@PathVariable String id, @RequestParam("image") MultipartFile image) {
        try {
            // Get the product by ID
            products product = productsService.getProductsById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            // Update the product's image
            product.setImageStore(image.getBytes());

            // Save the updated product
            products updatedProduct = productsService.updateProducts(id, product);

            // Create a response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Image uploaded successfully.");
            response.put("product", updatedProduct);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Failed to upload image."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<products> updateProductPartial(@PathVariable String id, @RequestBody products ProductsDetail) {
        products updatedProducts = productsService.updateProducts(id, ProductsDetail);
        if (updatedProducts != null) {
            return ResponseEntity.ok(updatedProducts);
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteProducts(@PathVariable String id) {
         productsService.deleteProducts(id);
         return ResponseEntity.noContent().build();
     }

}
package com.example.ccsd.Products;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "products")
public class products {
    @Id
    private String id;
    private String title;
    private String postSlug;
    private String postShortDescription;
    private String tag;
    private String place;
    private String dateProduct;
    private String status;
    private byte[] imageStore;
    private String imageStore64String;

    // Default constructor
    public products() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPostSlug() {
        return postSlug;
    }

    public void setPostSlug(String postSlug) {
        this.postSlug = postSlug;
    }

    public String getPostShortDescription() {
        return postShortDescription;
    }

    public void setPostShortDescription(String postShortDescription) {
        this.postShortDescription = postShortDescription;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDateProduct() {
        return dateProduct;
    }

    public void setDateProduct(String dateProduct) {
        this.dateProduct = dateProduct;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public byte[] getImageStore() {
        return imageStore;
    }

    public void setImageStore(byte[] imageStore) {
        this.imageStore = imageStore;
    }

    public String getImageStore64String() {
        return imageStore64String;
    }

    public void setImageStore64String(String imageStore64String) {
        this.imageStore64String = imageStore64String;
    }

    public String getImageAsBase64() {
        if (this.imageStore != null) {
            return java.util.Base64.getEncoder().encodeToString(this.imageStore);
        }
        return null;
    }
}

package com.example.ccsd.Gallery;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class galleryService {

    @Autowired
    private galleryRepository GalleryRepository;

    public List<gallery> getAllGallerys() {
        return GalleryRepository.findAll();
    }

    public Optional<gallery> getGalleryById(String id) {
        return GalleryRepository.findById(id);
    }

    public gallery addGallery(gallery Gallery) {
        return GalleryRepository.save(Gallery);
    }

    public gallery updategallery(String id, gallery GalleryDetails) {
        Optional<gallery> gallery = GalleryRepository.findById(id);
        if (gallery.isPresent()) {
            GalleryDetails.setId(id);
            return GalleryRepository.save(GalleryDetails);
        }
        return null;
    }

    public void deletegallery(String id) {
        GalleryRepository.deleteById(id);
    }

}

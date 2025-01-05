package com.example.ccsd.WebsiteTexts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class WebsiteTextsService {

    @Autowired
    private WebsiteTextsRepository websiteTextsRepository;

    public List<WebsiteTexts> getAllText() {
        return websiteTextsRepository.findAll();
    }

    public Optional<WebsiteTexts> getTextById(String id) {
        return websiteTextsRepository.findById(id);
    }

    public WebsiteTexts addText(WebsiteTexts websiteTexts) {
        return websiteTextsRepository.save(websiteTexts);
    }

    public WebsiteTexts updateText(String id, WebsiteTexts textDetails) {
        Optional<WebsiteTexts> websiteText = websiteTextsRepository.findById(id);
        if (websiteText.isPresent()) {
            textDetails.setId(id);
            return websiteTextsRepository.save(textDetails);
        }
        return null;
    }

    public void deleteText(String id) {
        websiteTextsRepository.deleteById(id);
    }
}

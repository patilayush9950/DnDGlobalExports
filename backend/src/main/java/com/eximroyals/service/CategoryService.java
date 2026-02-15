package com.eximroyals.service;

import com.eximroyals.model.Category;
import com.eximroyals.repository.CategoryRepository;
import com.eximroyals.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setTitle(categoryDetails.getTitle());
        category.setDescription(categoryDetails.getDescription());
        if (categoryDetails.getImageUrl() != null) {
            category.setImageUrl(categoryDetails.getImageUrl());
        }

        return categoryRepository.save(category);
    }

    @org.springframework.transaction.annotation.Transactional
    public void deleteCategory(Long id) {
        // Delete associated products first
        productRepository.deleteByCategoryId(id);
        categoryRepository.deleteById(id);
    }
}

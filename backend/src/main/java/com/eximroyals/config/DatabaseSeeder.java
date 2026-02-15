package com.eximroyals.config;

import com.eximroyals.model.Admin;
import com.eximroyals.model.Category;
import com.eximroyals.model.Product;
import com.eximroyals.model.StaticPage;
import com.eximroyals.repository.AdminRepository;
import com.eximroyals.repository.CategoryRepository;
import com.eximroyals.repository.ProductRepository;
import com.eximroyals.repository.StaticPageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(AdminRepository adminRepository, StaticPageRepository staticPageRepository,
            CategoryRepository categoryRepository, ProductRepository productRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin
            if (!adminRepository.existsByEmail("admin@dndglobal.com")) {
                Admin admin = new Admin();
                admin.setEmail("admin@dndglobal.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                adminRepository.save(admin);
                System.out.println("Default Admin initialized");
            }

            // Seed Static Pages
            seedPage(staticPageRepository, "about-us", "About Exim Royals",
                    "Welcome to Exim Royals, India's premier agro-export company.");
            seedPage(staticPageRepository, "why-choose-us", "Why Choose Us",
                    "We offer the best quality products, reliable logistics, and competitive pricing.");

            // Seed Categories
            Category spices = seedCategory(categoryRepository, "Organic Spices",
                    "Premium organic spices sourced directly from farmers.", "spices.jpg");
            Category medicinal = seedCategory(categoryRepository, "Medicinal Crops",
                    "High-quality medicinal crops for pharmaceutical use.", "medicinal.jpg");

            // Seed Products
            seedProduct(productRepository, "Organic Turmeric Powder",
                    "High curcumin turmeric powder sourced from organic farms.", "turmeric.jpg", null, spices);
            seedProduct(productRepository, "Kashmiri Red Chilli", "Vibrant red chilli powder with moderate heat.",
                    "chilli.jpg", null, spices);
            seedProduct(productRepository, "Ashwagandha Roots", "Premium quality Ashwagandha roots.",
                    "ashwagandha.jpg", null, medicinal);
        };
    }

    private void seedPage(StaticPageRepository repo, String pageName, String title, String content) {
        if (repo.findByPageName(pageName).isEmpty()) {
            repo.save(new StaticPage(pageName, title, content, null));
            System.out.println("Seeded page: " + pageName);
        }
    }

    private Category seedCategory(CategoryRepository repo, String title, String description, String imageUrl) {
        if (repo.existsByTitle(title)) {
            return repo.findAll().stream().filter(c -> c.getTitle().equals(title)).findFirst().orElse(null);
        }
        return repo.save(new Category(title, description, imageUrl));
    }

    private void seedProduct(ProductRepository repo, String title, String description, String imageUrl, String pdfUrl,
            Category category) {
        if (category == null)
            return;
        if (repo.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(title, title).isEmpty()) {
            repo.save(new Product(title, description, imageUrl, pdfUrl, category));
            System.out.println("Seeded product: " + title);
        }
    }
}


CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_label VARCHAR(50) NOT NULL UNIQUE
);
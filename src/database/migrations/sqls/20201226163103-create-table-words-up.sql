CREATE TABLE IF NOT EXISTS words (
    word_id INT AUTO_INCREMENT PRIMARY KEY,
    word_ru_value VARCHAR(50) NOT NULL,
    word_en_value VARCHAR(50) NOT NULL,
    word_count_views INT NOT NULL DEFAULT 0,
    word_count_success_guesses INT NOT NULL DEFAULT 0,
    UNIQUE KEY `word_values_unique_key` (`word_ru_value`,`word_en_value`)
);
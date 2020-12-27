CREATE TABLE IF NOT EXISTS categories_words_bunch (
    bunch_id INT AUTO_INCREMENT PRIMARY KEY,
    bunch_category_id INT NOT NULL,
    bunch_word_id INT NOT NULL,
    CONSTRAINT categories_words_bunch_category_id_fk FOREIGN KEY (bunch_category_id) REFERENCES categories(category_id),
    CONSTRAINT categories_words_bunch_word_id_fk FOREIGN KEY (bunch_word_id) REFERENCES words(word_id)
);
CREATE TABLE IF NOT EXISTS users_words (
    user_word_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    CONSTRAINT users_words_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT users_words_word_id_fk FOREIGN KEY (word_id) REFERENCES words(word_id)
);
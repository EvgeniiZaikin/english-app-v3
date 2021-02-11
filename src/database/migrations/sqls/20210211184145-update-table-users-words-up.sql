ALTER TABLE users_words
ADD COLUMN user_word_count_views INT NOT NULL DEFAULT 0,
ADD COLUMN user_word_count_success_guesses INT NOT NULL DEFAULT 0;
ALTER TABLE words
ADD COLUMN word_is_expression BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN word_is_slang BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN word_is_abuse BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN word_is_abbreviation BOOLEAN NOT NULL DEFAULT false;
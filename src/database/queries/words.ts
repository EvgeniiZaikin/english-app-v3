export default {
    createWord: (ruValue: string, enValue: string) : string => `
        INSERT INTO words (
            word_ru_value,
            word_en_value
        ) VALUES (
            '${ ruValue }',
            '${ enValue }'
        );
    `,

    getLastAddedWord: () : string => `
        SELECT *
        FROM words
        ORDER BY word_id DESC
        LIMIT 1
    `,

    getWordByValue: (ruValue: string, enValue: string) : string => `
        SELECT
            w.word_ru_value,
            w.word_en_value,
            cat.category_label
        FROM
            words AS w
            INNER JOIN categories_words_bunch AS cwb ON w.word_id = cwb.bunch_word_id
            INNER JOIN categories AS cat ON cwb.bunch_category_id = cat.category_id
        WHERE
            w.word_ru_value = '${ ruValue }'
            OR w.word_en_value = '${ enValue }';
    `,
};
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
};
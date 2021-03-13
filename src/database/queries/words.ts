const queries = {
  createWord: (
    ruValue: string,
    enValue: string,
    expression: boolean,
    slang: boolean,
    abuse: boolean,
    abbreviation: boolean
  ): string => `
        INSERT INTO words (
            word_ru_value,
            word_en_value,
            word_is_expression,
            word_is_slang,
            word_is_abuse,
            word_is_abbreviation
        ) VALUES (
            '${ruValue}',
            '${enValue}',
            ${expression},
            ${slang},
            ${abuse},
            ${abbreviation}
        );
    `,

  getLastAddedWord: (): string => `
        SELECT *
        FROM words
        ORDER BY word_id DESC
        LIMIT 1
    `,

  getWordByValue: (ruValue: string, enValue: string): string => `
        SELECT
            w.word_ru_value,
            w.word_en_value,
            w.word_is_expression as "isExpression",
            w.word_is_slang as "isSlang",
            w.word_is_abuse as "isAbuse",
            w.word_is_abbreviation as "isAbbreviation",
            cat.category_label
        FROM
            words AS w
            INNER JOIN categories_words_bunch AS cwb ON w.word_id = cwb.bunch_word_id
            INNER JOIN categories AS cat ON cwb.bunch_category_id = cat.category_id
        WHERE
            w.word_ru_value = '${ruValue}'
            OR w.word_en_value = '${enValue}';
    `,

  getGuessWords: (count: number, excludeValues: Array<string> = []): string => {
    const values: string = excludeValues.map((item: string) => `'${item}'`).join(',');

    return `
            SELECT 
                w.word_id AS "wordId",
                w.word_ru_value AS "ruValue",
                w.word_en_value AS "enValue",
                w.word_is_expression as "isExpression",
                w.word_is_slang as "isSlang",
                w.word_is_abuse as "isAbuse",
                w.word_is_abbreviation as "isAbbreviation",
                cat.category_label AS "category"
            FROM 
                words AS w
                LEFT JOIN categories_words_bunch AS cwb ON w.word_id = cwb.bunch_word_id
                LEFT JOIN categories AS cat ON cwb.bunch_category_id = cat.category_id
            ${excludeValues.length ? `WHERE w.word_ru_value NOT IN (${values})` : ''}
            ORDER BY 
                w.word_count_views, 
                w.word_count_success_guesses 
            LIMIT ${count};
        `;
  },

  updateWord: (id: number, ruValue: string, enValue: string, incrementViews: boolean, success: boolean): string => {
    const countSuccessGuesses: string = success ? 'word_count_success_guesses + 1' : 'word_count_success_guesses';
    const countViews: string = incrementViews ? 'word_count_views + 1' : 'word_count_views';

    return `
            UPDATE 
                words
            SET
                word_ru_value = '${ruValue}',
                word_en_value = '${enValue}',
                word_count_views = ${countViews},
                word_count_success_guesses = ${countSuccessGuesses}
            WHERE
                word_id = ${id}
        `;
  },
};

export default queries;

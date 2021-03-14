const queries = {
  getGuessWords: (userId: number | string, count: number, excludeValues: Array<string> = []): string => {
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
                w.transcription,
                cat.category_label AS "category",
                uw.user_word_id AS "userWordId",
                COALESCE(uw.user_word_count_views, w.word_count_views) AS "views",
                COALESCE(uw.user_word_count_success_guesses, w.word_count_success_guesses) AS "success"
            FROM 
                words AS w
                LEFT JOIN categories_words_bunch AS cwb ON w.word_id = cwb.bunch_word_id
                LEFT JOIN categories AS cat ON cwb.bunch_category_id = cat.category_id
                LEFT JOIN users_words AS uw ON w.word_id = uw.word_id AND uw.user_id = ${userId}
            WHERE
                (w.last_show_datetime IS NULL OR w.last_show_datetime < NOW() - INTERVAL 5 MINUTE)
                ${excludeValues.length ? ` AND w.word_ru_value NOT IN (${values})` : ''}
            ORDER BY
                views,
                success
            LIMIT ${count};
        `;
  },

  updateWord: (userId: number, wordId: number, incrementViews: boolean, success: boolean): string => {
    const countSuccessGuesses: string = `user_word_count_success_guesses${success ? ` + 1` : ``}`;
    const countViews: string = `user_word_count_views${incrementViews ? ` + 1` : ``}`;

    return `
            UPDATE 
                users_words
            SET
                user_word_count_views = ${countViews},
                user_word_count_success_guesses = ${countSuccessGuesses}
            WHERE
                word_id = ${wordId}
                AND user_id = ${userId}
        `;
  },

  getUserWord: (userId: number, wordId: number): string => {
    return `
            SELECT
                *
            FROM
                users_words
            WHERE
                word_id = ${wordId}
                AND user_id = ${userId} 
        `;
  },

  addUserWord: (userId: number, wordId: number): string => {
    return `
            INSERT INTO users_words (
                user_id,
                word_id
            ) VALUES (
                ${userId},
                ${wordId}
            )
        `;
  },
};

export default queries;

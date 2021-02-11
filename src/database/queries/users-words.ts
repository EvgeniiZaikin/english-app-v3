export default {
    getGuessWords: (userId: number | string, count: number, excludeValues: Array<string> = []) : string => {
        const values: string = excludeValues.map((item: string) => `'${ item }'`).join(',');
        
        return `
            SELECT 
                w.word_id AS "wordId",
                w.word_ru_value AS "ruValue",
                w.word_en_value AS "enValue",
                cat.category_label AS "category",
                uw.user_word_id AS "userWordId",
                COALESCE(uw.user_word_count_views, w.word_count_views) AS "views",
                COALESCE(uw.user_word_count_success_guesses, w.word_count_success_guesses) AS "success"
            FROM 
                words AS w
                LEFT JOIN categories_words_bunch AS cwb ON w.word_id = cwb.bunch_word_id
                LEFT JOIN categories AS cat ON cwb.bunch_category_id = cat.category_id
                LEFT JOIN users_words AS uw ON w.word_id = uw.word_id AND uw.user_id = ${ userId }
            ${ 
                excludeValues.length ? `WHERE w.word_ru_value NOT IN (${ values })` : '' 
            }
            ORDER BY
                views,
                success
            LIMIT ${ count };
        `;
    },
};
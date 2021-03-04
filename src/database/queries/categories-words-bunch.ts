const queries = {
  post: (wordId: number, category: string) => `
    INSERT INTO categories_words_bunch (
        bunch_category_id,
        bunch_word_id
    ) VALUES (
        (
            SELECT 
                category_id 
            FROM 
                categories 
            WHERE 
                category_label = '${category}'
        ),
        ${wordId}
    )
`,
};

export default queries;

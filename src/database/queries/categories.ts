export default {
    getCategories: () => `
        SELECT
            *
        FROM
            categories
    `,

    createCategory: (label: string) : string => `
        INSERT INTO categories (category_label) VALUES ('${ label }')
    `,
};
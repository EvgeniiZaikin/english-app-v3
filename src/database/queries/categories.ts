const queries = {
  getCategories: () => `
    SELECT
        *
    FROM
        categories
`,

  createCategory: (category_label: string): string => `
    INSERT INTO categories (category_label) VALUES ('${category_label}')
`,
};

export default queries;

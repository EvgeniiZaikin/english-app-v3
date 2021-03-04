const queries = {
  addUser: (login: string, password: string) => `
        INSERT INTO users (
            user_login, 
            user_password
        ) VALUES (
            '${login}',
            '${password}'
        )
    `,

  checkUserExists: (login: string) => `
        SELECT 
            *
        FROM 
            users
        WHERE 
            user_login = '${login}'
    `,

  authUser: (login: string, password: string) => `
        SELECT
            *
        FROM
            users
        WHERE
            user_login = '${login}'
            AND user_password = '${password}'
    `,
};

export default queries;

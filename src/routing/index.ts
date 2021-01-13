import words from './words';
import categories from './categories';
import { ResultSetHeader, OkPacket, RowDataPacket, FieldPacket } from 'mysql2';
import connection from '../database';

export default {
    words,
    categories,
};

export type queryResultType = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];
export type rowsType = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | Array<object>;
export type resultType = rowsType | string | null;

export const dbRequest = async (query: string) : Promise<queryResultType> => {
    const result: queryResultType = await connection.promise().query(query);
    return result;
};

export interface IResponse {
    status: boolean,
    result: resultType,
    error: any,
};

export const successResponse = (result: resultType = null) : IResponse => {
    return {
        status: true,
        result,
        error: null,
    };
};

export const badResponse = (error: any) : IResponse => {
    return {
        status: false,
        result: null,
        error,
    };
};
import words from './words';
import categories from './categories';
import { ResultSetHeader, OkPacket, RowDataPacket, FieldPacket } from 'mysql2';


export default {
    words,
    categories,
};

export type queryResultType = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];
export type rowsType = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | Array<object>;
export type resultType = rowsType | string | null;

export const successResponse = (result: resultType = null) => {
    return {
        status: true,
        result,
        error: null,
    };
};

export const badResponse = (error: any) => {
    return {
        status: false,
        result: null,
        error,
    };
};
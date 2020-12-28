import words from './words';
import { ResultSetHeader, OkPacket, RowDataPacket } from 'mysql2';

export default {
    words,
};

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
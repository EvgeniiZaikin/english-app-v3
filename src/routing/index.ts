import words from './words';
import { ResultSetHeader, OkPacket, RowDataPacket, FieldPacket } from 'mysql2';

export default {
    words,
};

export type rowsType = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | Array<object>;

export const successResponse = (result: rowsType | string | null = null) => {
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
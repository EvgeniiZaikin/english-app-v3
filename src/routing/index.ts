import { ResultSetHeader, OkPacket, RowDataPacket, FieldPacket } from 'mysql2';
import { Response } from 'express';

import words from './words';
import categories from './categories';
import users from './users';
import usersWords from './users-words';
import connection from '../database';

const routing = {
  words,
  categories,
  users,
  usersWords,
};

export default routing;

export type TQueryResult = [
  RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader,
  FieldPacket[]
];
export type TRows = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | Array<object>;
export type TResult = TRows | string | null;

export const dbRequest = async (query: string): Promise<TQueryResult> => {
  const result: TQueryResult = await connection.promise().query(query);
  return result;
};

export interface IResponse {
  status: boolean;
  result: TResult;
  error: unknown;
}

export const successResponse = (result: TResult = null): IResponse => {
  return {
    status: true,
    result,
    error: null,
  };
};

export const badResponse = (error: unknown): IResponse => {
  return {
    status: false,
    result: null,
    error,
  };
};

export const endpoint = async (res: Response, logic: Function): Promise<Response<unknown>> => {
  try {
    const data: TResult = await logic();
    return res.send(successResponse(data));
  } catch (error: unknown) {
    return res.send(badResponse((error as Error).toString()));
  }
};

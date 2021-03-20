import { ReducersState } from '@store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IResponse } from '@utils/interfaces';

export type AsyncDispatch = ThunkDispatch<ReducersState, void, AnyAction>;

export type AxiosResponse = { data: IResponse };

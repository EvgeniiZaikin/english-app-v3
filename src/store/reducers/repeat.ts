import { Reducer, AnyAction, Dispatch } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '@rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { reducersState } from '@store';
import { showGlobalLoading, hideGlobalLoading } from './global-loading';
import { showErrorGlobalAlert } from './global-alert';
import axios from 'axios';
import { IResponse } from '@utils/interfaces';

const SET_REPEAT_WORD_INFO: string = 'SET_REPEAT_WORD_INFO';
const FINISH_REPEAT_WORD: string = 'FINISH_REPEAT_WORD';
const SET_REPEAT_WORD_STATUS: string = 'SET_GUESSED_WORD_STATUS';
const RESET_REPEAT_WORD_INFO: string = 'RESET_REPEAT_WORD_INFO';

interface IState {
    word: string,
    wordId: number | null,
    category: string,
    rightEnValue: string,
    enValues: Array<string>,
    guessed: boolean,
    finished: boolean,
};

const initialState: IState = {
    word: '',
    wordId: null,
    category: '',
    rightEnValue: '',
    enValues: [],
    guessed: false,
    finished: false,
};

const repeat: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.repeat;
            return { ...hydrateState };
        case SET_REPEAT_WORD_INFO:
            return { ...state, ...action.payload };
        case FINISH_REPEAT_WORD:
            return { ...state, finished: true };
        case SET_REPEAT_WORD_STATUS:
            return { ...state, guessed: action.payload };
        case RESET_REPEAT_WORD_INFO:
            return { ...initialState };
        default:
            return { ...state };
    }
};

export default repeat;

export const setRepeatWordInfo = (data: object) => action<object>(SET_REPEAT_WORD_INFO, data);
export const finishRepeatWord = () => action(FINISH_REPEAT_WORD);
export const setRepeatWordStatus = (status: boolean) => action<boolean>(SET_REPEAT_WORD_STATUS, status);
export const resetRepeatWordInfo = () => action(RESET_REPEAT_WORD_INFO);

export const setRepeatWordData = (userId: number | null, isAuth: boolean) => async (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    dispatch(showGlobalLoading());

    try {
        dispatch(resetRepeatWordInfo());

        const url: string = isAuth && userId ?
            `/api/users-words/guess-word?userId=${ userId }` :
            `/api/words/guess-word`;

        const { data: { status, result, error } }: { data: IResponse } = await axios.get(url);
        if (status && !error) {
            const [ words ] = result as Array<object>;
            dispatch(setRepeatWordInfo(words));
        } else {
            throw new Error(`Status get words is false! Error: ${error}`);
        }
    } catch (error: any) {
        showErrorGlobalAlert(dispatch, `Can not get guess word!`, error);
    }

    dispatch(hideGlobalLoading());
};

interface IUpdateWordParams {
    id: number,
    ruValue: string,
    enValue: string,
    incrementViews: boolean,
    success: boolean,
    isAuth: boolean, 
    userId: number | null,
}

export const updateWord = (params: IUpdateWordParams) => async (dispatch: Dispatch) => {
    try {
        const { data: { status, error } } : { data: IResponse } = await axios.put(`/api/words/word`, params);

        if (!status || error) showErrorGlobalAlert(dispatch, `Word did not update!`, error);
        else {
            if (params.isAuth && params.userId) {
                const { data: { status, result, error } } : { data: IResponse } = await axios.get(`/api/users-words/user-word`, { params: {
                    userId: params.userId, id: params.id,
                }});
                if (!status || error) {
                    showErrorGlobalAlert(dispatch, `User word did not update!`, error);
                }
                if (result[0]) {
                    const { data: { status, error } } : { data: IResponse } = await axios.put(`/api/users-words/user-word`, params);
                    (!status || error) && showErrorGlobalAlert(dispatch, `User word did not update!`, error);
                } else {
                    const { data: { status, error } } : { data: IResponse } = await axios.post(`/api/users-words/user-word`, params);
    
                    if (!status || error) showErrorGlobalAlert(dispatch, `User word did not create!`, error);
                    else {
                        const { data: { status, error } } : { data: IResponse } = await axios.put(`/api/users-words/user-word`, params);
                        (!status || error) && showErrorGlobalAlert(dispatch, `User word did not update!`, error);
                    }
                }
            }
        }
    } catch (error: any) {
        showErrorGlobalAlert(dispatch, `Word did not update!`, error);
    }
};
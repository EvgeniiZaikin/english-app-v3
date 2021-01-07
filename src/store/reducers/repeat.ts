import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { reducersState } from '@store';
import { showGlobalLoading, hideGlobalLoading } from './global-loading';
import { showGlobalAlert, delayHideGlobalAlert, AlertTypes } from './global-alert';
import axios from 'axios';
import { IResponse } from '../../routing';

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
export const setRepeatWordData = () => async (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    dispatch(showGlobalLoading());

    try {
        dispatch(resetRepeatWordInfo());

        const { data }: { data: IResponse } = await axios.get(`/api/words/guess-word`);
        const { status, result, error } = data;
        if (status && !error) {
            const [ words ] = result as Array<object>;
            dispatch(setRepeatWordInfo(words));
        } else {
            throw new Error(`Status get words is false! Error: ${error}`);
        }
    } catch (error: any) {
        dispatch(showGlobalAlert(AlertTypes.ERROR, 'Can not get guess word!'));
        console.log(error);
        
        delayHideGlobalAlert(dispatch, 1500);
    }

    dispatch(hideGlobalLoading());
};
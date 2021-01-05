import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '../reducers';

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
import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '../reducers';

const SET_TYPE: string = 'SET_TYPE';
const SET_RU_VALUE: string = 'SET_RU_VALUE';
const SET_EN_VALUE: string = 'SET_EN_VALUE';
const SET_CATEGORY: string = 'SET_CATEGORY';
const SET_ENABLE_CATEGORIES: string = 'SET_ENABLE_CATEGORIES';

interface IState {
    type: string,
    ruValue: string,
    category: string,
    enValue: string,
    enableCategories: Array<string>,
};

const initialState: IState = {
    type: `word`,
    ruValue: '',
    category: '',
    enValue: '',
    enableCategories: [],
};

const add: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.add;
            return { ...hydrateState };
        case SET_TYPE:
            return { ...state, type: action.payload };
        case SET_RU_VALUE:
            return { ...state, ruValue: action.payload };
        case SET_EN_VALUE:
            return { ...state, enValue: action.payload };
        case SET_CATEGORY:
            return { ...state, category: action.payload };
        case SET_ENABLE_CATEGORIES:
            return { ...state, enableCategories: action.payload };
        default:
            return { ...state };
    }
};

export default add;

export const setType: Function = (type: string) => action<string>(SET_TYPE, type);
export const setRuValue: Function = (value: string) => action<string>(SET_RU_VALUE, value);
export const setEnValue: Function = (value: string) => action<string>(SET_EN_VALUE, value);
export const setCategory: Function = (category: string) => action<string>(SET_RU_VALUE, category);
export const setEnabledCategories: Function = (categories: Array<string>) => action<Array<string>>(SET_ENABLE_CATEGORIES, categories);
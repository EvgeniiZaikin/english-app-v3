import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { action } from '../reducers';

export const SET_SEARCH_INFO: string = 'SET_SEARCH_INFO';

interface IState {
    ruValue: string,
    enValue: string,
    category: string,
};

const initialState: IState = {
    ruValue: '',
    enValue: '',
    category: '',
};

const search: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.search;
            return { ...hydrateState };
        default:
            return { ...state };
    }
};

export default search;

export const setSearchInfo = (info: IState) => action<IState>(SET_SEARCH_INFO, info);
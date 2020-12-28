import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '../reducers';

const SHOW_GLOBAL_LOADING: string = 'SHOW_GLOBAL_LOADING';
const HIDE_GLOBAL_LOADING: string = 'HIDE_GLOBAL_LOADING';

interface IState {
    show: boolean,
};

const initialState: IState = {
    show: false,
};

const globalLoading: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.globalLoading;
            return { ...hydrateState };
        case SHOW_GLOBAL_LOADING:
            return { ...state, show: true };
        case SHOW_GLOBAL_LOADING:
            return { ...state, show: false };
        default:
            return { ...state };
    }
};

export default globalLoading;

export const showGlobalLoading = () => action(SHOW_GLOBAL_LOADING);
export const hideGlobalLoading = () => action(HIDE_GLOBAL_LOADING);
import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { action } from '@rootReducer';

const SHOW_GLOBAL_ALERT: string = 'SHOW_GLOBAL_ALERT';
const HIDE_GLOBAL_ALERT: string = 'HIDE_GLOBAL_ALERT';

export enum AlertTypes {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
};

interface IState {
    show: boolean,
    text: string,
    type: AlertTypes,
};

const initialState: IState = {
    show: false,
    text: '',
    type: AlertTypes.INFO,
};

const globalAlert: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.globalAlert;
            return { ...hydrateState };
        case SHOW_GLOBAL_ALERT:
            return { ...state, show: true, text: action.payload.text, type: action.payload.type };
        case HIDE_GLOBAL_ALERT:
            return { ...state, show: false };
        default:
            return { ...state };
    }
};

export default globalAlert;

export const showGlobalAlert = (type: AlertTypes, text: string) => action<object>(SHOW_GLOBAL_ALERT, { type, text });
export const hideGlobalAlert = () => action(HIDE_GLOBAL_ALERT);
export const delayHideGlobalAlert = (dispatch: Function, delay: number) => {
    setTimeout(() => {
        dispatch(hideGlobalAlert());  
    }, delay);
};
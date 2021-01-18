import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '@rootReducer';

const SET_LOGIN: string = 'SET_LOGIN';
const SET_PASSWORD: string = 'SET_PASSWORD';
const TOGGLE_SHOW_PASSWORD: string = 'TOGGLE_SHOW_PASSWORD';

interface IState {
    login: string,
    password: string,
    showPassword: boolean,
};

const initialState: IState = {
    login: '',
    password: '',
    showPassword: false,
};

const auth: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.auth;
            return { ...hydrateState };
        case SET_LOGIN:
            return { ...state, login: action.payload };
        case SET_PASSWORD:
            return { ...state, password: action.payload };
        case TOGGLE_SHOW_PASSWORD:
            return { ...state, showPassword: !state.showPassword };
        default:
            return { ...state };
    }
};

export default auth;

export const setLogin = (login: string) => action<string>(SET_LOGIN, login);
export const setPassword = (password: string) => action<string>(SET_PASSWORD, password);
export const toggleShowPassword = () => action(TOGGLE_SHOW_PASSWORD);
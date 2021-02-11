import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { hideGlobalLoading, showGlobalLoading } from './global-loading';
import { AlertTypes, delayHideGlobalAlert, showGlobalAlert } from './global-alert';
import { IResponse } from '@utils/interfaces';
import axios from 'axios';

const SET_LOGIN: string = 'SET_LOGIN';
const SET_PASSWORD: string = 'SET_PASSWORD';
const TOGGLE_SHOW_PASSWORD: string = 'TOGGLE_SHOW_PASSWORD';
const LOGIN: string = 'LOGIN';
const LOGOUT: string = 'LOGOUT';
const SHOW_AUTH_FORM: string = 'SHOW_AUTH_FORM';
const HIDE_AUTH_FORM: string = 'HIDE_AUTH_FORM';

interface IState {
    login: string,
    password: string,
    showPassword: boolean,
    isAuth: boolean,
    showAuthForm: boolean,
    isAuthProcess: boolean,
    isRegProcess: boolean,
};

const initialState: IState = {
    login: '',
    password: '',
    showPassword: false,
    isAuth: false,
    showAuthForm: false,
    isAuthProcess: false,
    isRegProcess: false,
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
        case LOGIN:
            return { ...state, isAuth: true };
        case LOGOUT:
            return { 
                ...state, 
                isAuth: false,
                login: '',
                password: '',
            };
        case SHOW_AUTH_FORM:
            return { 
                ...state, 
                showAuthForm: true,
                isAuthProcess: action.payload === 'auth',
                isRegProcess: action.payload === 'reg',
            };   
        case HIDE_AUTH_FORM: 
            return { 
                ...state, 
                showAuthForm: false,
                isAuthProcess: false,
                isRegProcess: false,
            };
        default:
            return { ...state };
    }
};

export default auth;

export const setLogin = (login: string) => action<string>(SET_LOGIN, login);
export const setPassword = (password: string) => action<string>(SET_PASSWORD, password);
export const toggleShowPassword = () => action(TOGGLE_SHOW_PASSWORD);
export const loginUser = () => action(LOGIN);
export const logoutUser = () => action(LOGOUT);
export const showAuthForm = (type: string) => action(SHOW_AUTH_FORM, type);
export const hideAuthForm = () => action(HIDE_AUTH_FORM);

export const registration = (login: string, password: string) => async (dispatch: AsyncDispatch) => {
    dispatch(showGlobalLoading());

    try {
        if (!login || !password) {
            dispatch(showGlobalAlert(AlertTypes.ERROR, `Логин или Пароль не заполнены!`));
        } else {
            const { data: { status, result, error } }: { data: IResponse } = await axios.post('/api/users/registration', {
                login, password,
            });
    
            if (status) {
                dispatch(showGlobalAlert(AlertTypes.SUCCESS, `Пользователь успешно зарегистрирован и авторизирован!`));
    
                const [ user ] = result;
                const { user_login, user_password } = user;
                dispatch(setLogin(user_login));
                dispatch(setPassword(user_password));
                dispatch(loginUser());
            } else {
                dispatch(showGlobalAlert(AlertTypes.ERROR, `Ошибка при регистрации пользователя: ${ error }`));
                console.log(error);
            }
        }

        delayHideGlobalAlert(dispatch, 1500);
    } catch (error: any) {
        dispatch(showGlobalAlert(AlertTypes.ERROR, `Ошибка при регистрации пользователя!`));
        console.log(error);
        delayHideGlobalAlert(dispatch, 1500);
    }

    dispatch(hideGlobalLoading());
    dispatch(hideAuthForm());
};

export const authorization = (login: string, password: string) => async (dispatch: AsyncDispatch) => {
    dispatch(showGlobalLoading());

    try {
        if (!login || !password) {
            dispatch(showGlobalAlert(AlertTypes.ERROR, `Логин или Пароль не заполнены!`));
        } else {
            const { data: { status, result, error } }: { data: IResponse } = await axios.post('/api/users/authorization', {
                login, password,
            });
    
            if (status) {
                dispatch(showGlobalAlert(AlertTypes.SUCCESS, `Вы успешно авторизированы!`));
    
                const [ user ] = result;
                const { user_login, user_password } = user;
                dispatch(setLogin(user_login));
                dispatch(setPassword(user_password));
                dispatch(loginUser());
            } else {
                dispatch(showGlobalAlert(AlertTypes.ERROR, `Ошибка при авторизации пользователя: ${ error }`));
                console.log(error);
            }
        }

        delayHideGlobalAlert(dispatch, 1500);
    } catch (error: any) {
        dispatch(showGlobalAlert(AlertTypes.ERROR, `Ошибка при авторизации пользователя!`));
        console.log(error);
        delayHideGlobalAlert(dispatch, 1500);
    }

    dispatch(hideGlobalLoading());
    dispatch(hideAuthForm());
};
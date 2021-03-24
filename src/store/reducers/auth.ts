import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { IResponse } from '@utils/interfaces';
import { hideGlobalLoading, showGlobalLoading } from './global-loading';
import { TSnackbar, showSnackbar } from './snackbar';

const SET_LOGIN: string = 'SET_LOGIN';
const SET_PASSWORD: string = 'SET_PASSWORD';
const SET_USER_ID: string = 'SET_USER_ID';
const TOGGLE_SHOW_PASSWORD: string = 'TOGGLE_SHOW_PASSWORD';
const LOGIN: string = 'LOGIN';
const LOGOUT: string = 'LOGOUT';

interface IState {
  userId: number | null;
  login: string;
  password: string;
  showPassword: boolean;
  isAuth: boolean;
}

const initialState: IState = {
  userId: null,
  login: '',
  password: '',
  showPassword: false,
  isAuth: false,
};

const auth: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.auth };
    case SET_LOGIN:
      return { ...state, login: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };
    case LOGIN:
      return { ...state, isAuth: true };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        userId: null,
        login: '',
        password: '',
      };
    default:
      return { ...state };
  }
};

export default auth;

export const setLogin = (login: string) => getAction<string>(SET_LOGIN, login);
export const setPassword = (password: string) => getAction<string>(SET_PASSWORD, password);
export const setUserId = (userId: number) => getAction<number>(SET_USER_ID, userId);
export const toggleShowPassword = () => getAction(TOGGLE_SHOW_PASSWORD);
export const loginUser = () => getAction(LOGIN);
export const logoutUser = () => getAction(LOGOUT);

const loginAction = (isAuth: boolean, login: string, password: string) => async (
  dispatch: AsyncDispatch
): Promise<boolean> => {
  const authData = {
    url: '/api/users/authorization',
    successMessage: 'Вы успешно авторизированы!',
    errorMessage: 'Ошибка при авторизации пользователя!',
    detailErrorMessage: (error: unknown) => `Ошибка при авторизации пользователя: ${error}`,
  };

  const regData = {
    url: '/api/users/registration',
    successMessage: 'Пользователь успешно зарегистрирован и авторизирован!',
    errorMessage: 'Ошибка при регистрации пользователя!',
    detailErrorMessage: (error: unknown) => `Ошибка при регистрации пользователя: ${error}`,
  };

  const data = isAuth ? authData : regData;

  let success = true;

  dispatch(showGlobalLoading());

  try {
    if (!login || !password) {
      success = false;
      dispatch(showSnackbar(TSnackbar.WARNING, 'Поле логин и/или пароль не заполнены'));
    } else {
      const {
        data: { status, result },
      }: { data: IResponse } = await axios.post(data.url, {
        login,
        password,
      });

      if (status) {
        const [user] = result;
        const { user_id: userId, user_login: userLogin, user_password: userPassword } = user;
        dispatch(setUserId(userId));
        dispatch(setLogin(userLogin));
        dispatch(setPassword(userPassword));
        dispatch(loginUser());
      } else {
        dispatch(showSnackbar(TSnackbar.ERROR, 'Ошибка при обработке авторизации на стороне сервера'));
        success = false;
      }
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.ERROR, 'Ошибка при обработке авторизации'));
    success = false;
  }

  dispatch(hideGlobalLoading());
  return success;
};

export const registration = (login: string, password: string) => loginAction(false, login, password);
export const authorization = (login: string, password: string) => loginAction(true, login, password);

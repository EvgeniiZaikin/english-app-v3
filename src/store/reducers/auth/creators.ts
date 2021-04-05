import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { IResponse } from '@utils/interfaces';
import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';

import { SET_LOGIN, SET_PASSWORD, SET_USER_ID, TOGGLE_SHOW_PASSWORD, LOGIN, LOGOUT } from './actions';

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

  return success;
};

export const registration = (login: string, password: string) => loginAction(false, login, password);
export const authorization = (login: string, password: string) => loginAction(true, login, password);

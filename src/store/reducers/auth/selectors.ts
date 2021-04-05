import { ReducersState } from '@store';

export const getIsAuth = (state: ReducersState) => state.auth.isAuth;
export const getLogin = (state: ReducersState) => state.auth.login;
export const getPassword = (state: ReducersState) => state.auth.password;
export const getUserId = (state: ReducersState) => state.auth.userId;
export const getShowPassword = (state: ReducersState) => state.auth.showPassword;

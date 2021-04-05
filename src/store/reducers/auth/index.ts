import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { IAuthState } from './types';
import { SET_LOGIN, SET_PASSWORD, SET_USER_ID, TOGGLE_SHOW_PASSWORD, LOGIN, LOGOUT } from './actions';

const initialState: IAuthState = {
  userId: null,
  login: '',
  password: '',
  showPassword: false,
  isAuth: false,
};

const auth: Reducer<IAuthState, AnyAction> = (state = initialState, action) => {
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
      return state;
  }
};

export default auth;

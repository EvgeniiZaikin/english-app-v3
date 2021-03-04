import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { getAction } from '@rootReducer';

export const SET_APP_THEME = 'SET_APP_THEME';

interface IState {
  theme: string;
}

const initialState: IState = {
  theme: 'light',
};

const theme: Reducer<IState, AnyAction> = (state = initialState, action): IState => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.theme };
    case SET_APP_THEME:
      return { ...state, theme: action.payload };
    default:
      return { ...state };
  }
};

export default theme;

export const setAppTheme = (appTheme: string) => getAction<string>(SET_APP_THEME, appTheme);

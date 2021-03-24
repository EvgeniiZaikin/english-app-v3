import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { getAction } from '@rootReducer';

const SHOW_SNACKBAR: string = 'SHOW_SNACKBAR';
const HIDE_SNACKBAR: string = 'HIDE_SNACKBAR';

export enum TSnackbar {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface IState {
  show: boolean;
  message: string;
  type: TSnackbar;
}

const initialState: IState = {
  show: false,
  message: '',
  type: TSnackbar.INFO,
};

const snackbar: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.snackbar };
    case SHOW_SNACKBAR:
      return { ...state, show: true, message: action.payload.message, type: action.payload.type };
    case HIDE_SNACKBAR:
      return { ...state, show: false };
    default:
      return { ...state };
  }
};

export default snackbar;

export const showSnackbar = (type: TSnackbar, message: string) => getAction<object>(SHOW_SNACKBAR, { type, message });
export const hideSnackbar = () => getAction(HIDE_SNACKBAR);

import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { TSnackbar } from './types';
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './actions';

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

import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction, Dispatch } from 'redux';
import { getAction } from '@rootReducer';
import { printLog } from '@utils/functions';

const SHOW_GLOBAL_ALERT: string = 'SHOW_GLOBAL_ALERT';
const HIDE_GLOBAL_ALERT: string = 'HIDE_GLOBAL_ALERT';

export enum AlertTypes {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface IState {
  show: boolean;
  text: string;
  type: AlertTypes;
}

const initialState: IState = {
  show: false,
  text: '',
  type: AlertTypes.INFO,
};

const globalAlert: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.globalAlert };
    case SHOW_GLOBAL_ALERT:
      return { ...state, show: true, text: action.payload.text, type: action.payload.type };
    case HIDE_GLOBAL_ALERT:
      return { ...state, show: false };
    default:
      return { ...state };
  }
};

export default globalAlert;

export const showGlobalAlert = (type: AlertTypes, text: string) => getAction<object>(SHOW_GLOBAL_ALERT, { type, text });
export const hideGlobalAlert = () => getAction(HIDE_GLOBAL_ALERT);

export const delayHideGlobalAlert = (dispatch: Function, delay: number): void => {
  setTimeout(() => {
    dispatch(hideGlobalAlert());
  }, delay);
};

export const showErrorGlobalAlert = (dispatch: Dispatch, message: string, error?: unknown): void => {
  dispatch(showGlobalAlert(AlertTypes.ERROR, message));
  error && printLog((error as Error).toString());
  delayHideGlobalAlert(dispatch, 1500);
};

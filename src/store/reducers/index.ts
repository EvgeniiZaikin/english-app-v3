import { combineReducers } from 'redux';
import globalLoading from './global-loading';
import search from './search';
import repeat from './repeat';
import auth from './auth';
import settings from './settings';
import footer from './footer';
import snackbar from './snackbar';

export default combineReducers({
  globalLoading,
  search,
  repeat,
  auth,
  settings,
  footer,
  snackbar,
});

export interface IAction<P> {
  type: string;
  payload?: P | null;
}

export function getAction<P>(type: string, payload: P | null = null): IAction<P> {
  return { type, payload };
}

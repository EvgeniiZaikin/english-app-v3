import { combineReducers } from 'redux';
import search from './search';
import repeat from './repeat';
import auth from './auth';
import settings from './settings';
import footer from './footer';
import snackbar from './snackbar';
import loading from './loading';
import create from './create';

export default combineReducers({
  search,
  repeat,
  auth,
  settings,
  footer,
  snackbar,
  loading,
  create,
});

export interface IAction<P> {
  type: string;
  payload?: P | null;
}

export function getAction<P>(type: string, payload: P | null = null): IAction<P> {
  return { type, payload };
}

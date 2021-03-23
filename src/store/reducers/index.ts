import { combineReducers } from 'redux';
import create from './create';
import globalLoading from './global-loading';
import globalAlert from './global-alert';
import search from './search';
import repeat from './repeat';
import auth from './auth';
import settings from './settings';
import footer from './footer';

export default combineReducers({
  create,
  globalLoading,
  globalAlert,
  search,
  repeat,
  auth,
  settings,
  footer,
});

export interface IAction<P> {
  type: string;
  payload?: P | null;
}

export function getAction<P>(type: string, payload: P | null = null): IAction<P> {
  return { type, payload };
}

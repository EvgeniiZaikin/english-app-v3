import { getAction } from '@rootReducer';
import { SHOW_GLOBAL_LOADING, HIDE_GLOBAL_LOADING } from './actions';

export const showGlobalLoading = () => getAction(SHOW_GLOBAL_LOADING);
export const hideGlobalLoading = () => getAction(HIDE_GLOBAL_LOADING);

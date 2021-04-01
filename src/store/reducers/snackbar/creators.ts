import { getAction } from '@rootReducer';
import { TSnackbar } from './types';
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './actions';

export const showSnackbar = (type: TSnackbar, message: string) => getAction<object>(SHOW_SNACKBAR, { type, message });
export const hideSnackbar = () => getAction(HIDE_SNACKBAR);

import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { getAction } from '@rootReducer';

const SHOW_GLOBAL_LOADING: string = 'SHOW_GLOBAL_LOADING';
const HIDE_GLOBAL_LOADING: string = 'HIDE_GLOBAL_LOADING';

interface IState {
  show: boolean;
}

const initialState: IState = {
  show: false,
};

const globalLoading: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.globalLoading };
    case SHOW_GLOBAL_LOADING:
      return { ...state, show: true };
    case HIDE_GLOBAL_LOADING:
      return { ...state, show: false };
    default:
      return { ...state };
  }
};

export default globalLoading;

export const showGlobalLoading = () => getAction(SHOW_GLOBAL_LOADING);
export const hideGlobalLoading = () => getAction(HIDE_GLOBAL_LOADING);

import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { ILoadingState } from './types';
import { SHOW_GLOBAL_LOADING, HIDE_GLOBAL_LOADING } from './actions';

const initialState: ILoadingState = {
  show: false,
};

const loading: Reducer<ILoadingState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.loading };
    case SHOW_GLOBAL_LOADING:
      return { ...state, show: true };
    case HIDE_GLOBAL_LOADING:
      return { ...state, show: false };
    default:
      return state;
  }
};

export default loading;

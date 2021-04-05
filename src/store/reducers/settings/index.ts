import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { SET_REMEMBER, SET_USE_ABUSE } from './actions';
import { ISettingsState } from './types';

const initialState: ISettingsState = {
  isRemember: false,
  useAbuse: false,
};

const settings: Reducer<ISettingsState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.settings };
    case SET_REMEMBER:
      return { ...state, isRemember: action.payload };
    case SET_USE_ABUSE:
      return { ...state, useAbuse: action.payload };
    default:
      return state;
  }
};

export default settings;

import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { IFooterState } from './types';
import { SET_ITEM_INDEX } from './actions';

const initialState: IFooterState = {
  itemIndex: null,
};

const footer: Reducer<IFooterState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.footer };
    case SET_ITEM_INDEX:
      return { ...state, itemIndex: action.payload };
    default:
      return state;
  }
};

export default footer;

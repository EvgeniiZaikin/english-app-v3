import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { getAction } from '@rootReducer';

const SET_ITEM_INDEX: string = 'SET_ITEM_INDEX';

interface IState {
  itemIndex: number | null;
}

const initialState: IState = {
  itemIndex: null,
};

const footer: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.footer };
    case SET_ITEM_INDEX:
      return { ...state, itemIndex: action.payload };
    default:
      return { ...state };
  }
};

export default footer;

export const setFooterItemIndex = (itemIndex: number | null) => getAction(SET_ITEM_INDEX, itemIndex);

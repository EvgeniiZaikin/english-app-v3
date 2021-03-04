import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { getAction } from '@rootReducer';

export const TOGGLE_NAVIGATION_FULLSIZE = 'TOGGLE_NAVIGATION_FULLSIZE';

interface IState {
  fullsize: boolean;
}

const initialState: IState = {
  fullsize: false,
};

const navigation: Reducer<IState, AnyAction> = (state = initialState, action): IState => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.navigation };
    case TOGGLE_NAVIGATION_FULLSIZE:
      return { ...state, fullsize: action.payload };
    default:
      return { ...state };
  }
};

export default navigation;

export const toggleNavigationFullsize = (fullsize: boolean) => getAction<boolean>(TOGGLE_NAVIGATION_FULLSIZE, fullsize);

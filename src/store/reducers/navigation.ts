import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { action } from '@rootReducer';

export const TOGGLE_NAVIGATION_FULLSIZE = 'TOGGLE_NAVIGATION_FULLSIZE';

interface IState {
    fullsize: boolean,
};

const initialState: IState = {
    fullsize: false,
};

const navigation: Reducer<IState, AnyAction> = (state = initialState, action) : IState => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.navigation;
            return { ...hydrateState };
        case TOGGLE_NAVIGATION_FULLSIZE:
            return { ...state, fullsize: action.payload };
        default:
            return { ...state };
    }
};

export default navigation;

export const toggleNavigationFullsize = (fullsize: boolean) => action<boolean>(TOGGLE_NAVIGATION_FULLSIZE, fullsize);
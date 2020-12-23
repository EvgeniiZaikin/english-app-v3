import { Reducer, AnyAction } from 'redux';
import { action } from '../reducers';

export const TOGGLE_NAVIGATION_FULLSIZE = 'TOGGLE_NAVIGATION_FULLSIZE';

interface IState {
    fullsize: boolean,
};

const initialState: IState = {
    fullsize: false,
};

const navigation: Reducer<IState, AnyAction> = (state = initialState, action) : IState => {
    switch (action.type) {
        case TOGGLE_NAVIGATION_FULLSIZE:
            return { ...state, fullsize: action.payload };
        default:
            return { ...state };
    }
};

export default navigation;

export const toggleNavigationFullsize = (fullsize: boolean) => action<boolean>(TOGGLE_NAVIGATION_FULLSIZE, fullsize);
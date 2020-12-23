import { Reducer, AnyAction } from 'redux';

export const TOGGLE_NAVIGATION_FULLSIZE = 'TOGGLE_NAVIGATION_FULLSIZE';

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}

export const toggleNavigationFullsize = (fullsize: boolean) => action<boolean>(TOGGLE_NAVIGATION_FULLSIZE, fullsize);

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
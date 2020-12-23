import { Reducer, AnyAction } from 'redux';

export const SET_APP_THEME = 'SET_APP_THEME';

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}

export const setAppTheme = (theme: string) => action<string>(SET_APP_THEME, theme);

interface IState {
    theme: string,
};

const initialState: IState = {
    theme: 'light',
};

const theme: Reducer<IState, AnyAction> = (state = initialState, action) : IState => {
    switch (action.type) {
        case SET_APP_THEME:
            return { ...state, theme: action.payload };
        default:
            return { ...state };
    }
};

export default theme;
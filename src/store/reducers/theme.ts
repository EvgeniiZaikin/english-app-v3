import { Reducer, AnyAction } from 'redux';
import { action } from '../reducers';

export const SET_APP_THEME = 'SET_APP_THEME';

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

export const setAppTheme = (theme: string) => action<string>(SET_APP_THEME, theme);
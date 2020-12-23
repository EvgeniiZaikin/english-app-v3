import { combineReducers } from 'redux';
import test from './test';
import navigation from './navigation';
import theme from './theme';

export default combineReducers({
    test,
    navigation,
    theme,
});

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}
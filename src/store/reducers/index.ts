import { combineReducers } from 'redux';
import test from './test';
import navigation from './navigation';
import theme from './theme';
import add from './add';

export default combineReducers({
    test,
    navigation,
    theme,
    add,
});

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}
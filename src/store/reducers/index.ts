import { combineReducers } from 'redux';
import test from './test';
import navigation from './navigation';
import theme from './theme';
import create from './create';

export default combineReducers({
    test,
    navigation,
    theme,
    create,
});

interface IAction<P> {
    type: string,
    payload?: P,
};

export function action<P>(type: string, payload: P): IAction<P> {
    return { type, payload };
}
import { combineReducers } from 'redux';
import test from './test';
import navigation from './navigation';
import theme from './theme';
import create from './create';
import globalLoading from './global-loading';
import globalAlert from './global-alert';
import search from './search';
import repeat from './repeat';
import auth from './auth';

export default combineReducers({
    test,
    navigation,
    theme,
    create,
    globalLoading,
    globalAlert,
    search,
    repeat,
    auth,
});

interface IAction<P> {
    type: string,
    payload?: P | null,
};

export function action<P>(type: string, payload: P | null = null): IAction<P> {
    return { type, payload };
}
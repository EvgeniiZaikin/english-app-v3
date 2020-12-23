import { combineReducers } from 'redux';
import test from './test';
import navigation from './navigation';
import theme from './theme';

export default combineReducers({
    test,
    navigation,
    theme,
});
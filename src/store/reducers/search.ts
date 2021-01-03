import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../reducers';
import { reducersState } from '@store';
import axios from 'axios';
import { showGlobalAlert, AlertTypes, delayHideGlobalAlert } from './global-alert';

export const SET_SEARCH_INFO: string = 'SET_SEARCH_INFO';

interface IState {
    ruValue: string,
    enValue: string,
    category: string,
};

const initialState: IState = {
    ruValue: '',
    enValue: '',
    category: '',
};

const search: Reducer<IState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const hydrateState = action.payload.search;
            return { ...hydrateState };
        case SET_SEARCH_INFO:
            const { ruValue, enValue, category } = action.payload;
            return { ...state, ruValue, enValue, category };
        default:
            return { ...state };
    }
};

export default search;

export const setSearchInfo = (info: IState) => action<IState>(SET_SEARCH_INFO, info);
export const setSearchData = (ruValue: string, enValue: string) => async (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    try {
        const { data } = await axios.get(`/api/words/word`, { params: { ruValue, enValue } });
        const { status, result, error } = data;

        if (status && result.length && !error) {
            const [ word ] = result;
            dispatch(setSearchInfo(word));
        } else {
            dispatch(setSearchInfo({
                ruValue: '',
                enValue: '',
                category: '',
            }));
            throw new Error(`Status search word is false! Error: ${ error.toString() }`);
        }
    } catch (exception: any) {
        dispatch(showGlobalAlert(AlertTypes.ERROR, 'Can not search word!'));
        console.log(exception);
        
        delayHideGlobalAlert(dispatch, 1500);
    }
};
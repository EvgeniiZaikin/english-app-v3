import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import { action } from '@rootReducer';
import axios from 'axios';
import { showGlobalAlert, AlertTypes, delayHideGlobalAlert, showErrorGlobalAlert } from './global-alert';
import { AsyncDispatch } from '@utils/types';
import { hideGlobalLoading, showGlobalLoading } from './global-loading';
import { sleep } from '@utils/functions';

export const SET_SEARCH_INFO: string = 'SET_SEARCH_INFO';
export const RESET_SEARCH_INFO: string = 'RESET_SEARCH_INFO';

interface IState {
  ruValue: string;
  enValue: string;
  category: string;
}

const initialState: IState = {
  ruValue: 'Слово не определено',
  enValue: 'Translate is not define',
  category: 'Категория не определена',
};

const search: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      const hydrateState = action.payload.search;
      return { ...hydrateState };
    case SET_SEARCH_INFO:
      const { ruValue, enValue, category } = action.payload;
      return { ...state, ruValue, enValue, category };
    case RESET_SEARCH_INFO:
      return {
        ...state,
        ruValue: 'Слово не определено',
        enValue: 'Translate is not define',
        category: 'Категория не определена',
      };
    default:
      return { ...state };
  }
};

export default search;

export const setSearchInfo = (info: IState) => action<IState>(SET_SEARCH_INFO, info);
export const resetSearchInfo = () => action(RESET_SEARCH_INFO);

export const setSearchData = (ruValue: string, enValue: string) => async (dispatch: AsyncDispatch) => {
  dispatch(showGlobalLoading());

  await sleep(800);

  try {
    const {
      data: { status, result, error },
    } = await axios.get(`/api/words/word`, { params: { ruValue, enValue } });

    if (status && result.length && !error) {
      const [word] = result;
      dispatch(setSearchInfo(word));
    } else {
      dispatch(resetSearchInfo());
      throw new Error(`Status search word is false! Error: ${error.toString()}`);
    }
  } catch (error: any) {
    showErrorGlobalAlert(dispatch, `Can not search word!`, error);
  }

  dispatch(hideGlobalLoading());
};

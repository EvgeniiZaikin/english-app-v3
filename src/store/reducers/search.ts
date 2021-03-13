import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { sleep } from '@utils/functions';

import { showErrorGlobalAlert } from './global-alert';
import { hideGlobalLoading, showGlobalLoading } from './global-loading';

export const SET_SEARCH_INFO: string = 'SET_SEARCH_INFO';
export const RESET_SEARCH_INFO: string = 'RESET_SEARCH_INFO';

interface IState {
  ruValue: string;
  enValue: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
}

const initialState: IState = {
  ruValue: 'Слово не определено',
  enValue: 'Translate is not define',
  category: 'Категория не определена',
  isExpression: false,
  isSlang: false,
  isAbuse: false,
  isAbbreviation: false,
};

const search: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.search };
    case SET_SEARCH_INFO:
      return {
        ...state,
        ruValue: action.payload.ruValue,
        enValue: action.payload.enValue,
        category: action.payload.category,
        isExpression: action.payload.isExpression,
        isSlang: action.payload.isSlang,
        isAbuse: action.payload.isAbuse,
        isAbbreviation: action.payload.isAbbreviation,
      };
    case RESET_SEARCH_INFO:
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default search;

export const setSearchInfo = (info: IState) => getAction<IState>(SET_SEARCH_INFO, info);
export const resetSearchInfo = () => getAction(RESET_SEARCH_INFO);

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
  } catch (error: unknown) {
    showErrorGlobalAlert(dispatch, `Can not search word!`, error);
  }

  dispatch(hideGlobalLoading());
};

import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, AnyAction } from 'redux';
import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { sleep } from '@utils/functions';

import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';

export const SET_SEARCH_INFO: string = 'SET_SEARCH_INFO';
export const RESET_SEARCH_INFO: string = 'RESET_SEARCH_INFO';
export const SET_SEARCH_VALUE: string = 'SET_SEARCH_VALUE';

interface IState {
  searchValue: string;
  ruValue: string;
  enValue: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

const initialState: IState = {
  searchValue: '',
  ruValue: 'Слово не определено',
  enValue: 'Translate is not define',
  category: 'Категория не определена',
  isExpression: false,
  isSlang: false,
  isAbuse: false,
  isAbbreviation: false,
  transcription: null,
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
        transcription: action.payload.transcription,
      };
    case RESET_SEARCH_INFO:
      return {
        ...initialState,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return { ...state };
  }
};

export default search;

export const setSearchValue = (value: string) => getAction<string>(SET_SEARCH_VALUE, value);
export const setSearchInfo = (info: IState) => getAction<IState>(SET_SEARCH_INFO, info);
export const resetSearchInfo = () => getAction(RESET_SEARCH_INFO);

export const setSearchData = (ruValue: string, enValue: string) => async (dispatch: AsyncDispatch) => {
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
      dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось выполнить поиск слова на сервере'));
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.ERROR, 'Не удалось выполнить поиск слова'));
  }
};

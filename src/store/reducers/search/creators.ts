import axios from 'axios';

import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';
import { getAction } from '@rootReducer';
import { sleep } from '@utils/functions';
import { AsyncDispatch } from '@utils/types';

import { RESET_SEARCH_INFO, SET_SEARCH_INFO, SET_SEARCH_VALUE } from './actions';
import { ISearchState } from './types';

export const setSearchValue = (value: string) => getAction<string>(SET_SEARCH_VALUE, value);
export const setSearchInfo = (info: ISearchState) => getAction<ISearchState>(SET_SEARCH_INFO, info);
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

import { hideGlobalLoading, showGlobalLoading } from '@reducers/loading/creators';
import { getAction } from '@rootReducer';
import { sleep } from '@utils/functions';
import { IResponse } from '@utils/interfaces';
import { AsyncDispatch, ICategory } from '@utils/types';
import axios from 'axios';
import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';
import { CHANGE_FIELD, RESET_CREATE_FIELDS, SET_EXIST_CATEGORIES } from './actions';
import { ICreateState } from './types';

export const changeField = (field: string, value: string | boolean) =>
  getAction<{ field: string; value: string | boolean }>(CHANGE_FIELD, { field, value });
export const resetCreateFields = () => getAction(RESET_CREATE_FIELDS);
export const setExistCategories = (list: string[]) => getAction<string[]>(SET_EXIST_CATEGORIES, list);

export const saveField = (params: Omit<ICreateState, 'listExistCategories'>) => async (
  dispatch: AsyncDispatch
): Promise<void> => {
  const {
    entity,
    ruValue,
    enValue,
    transcription,
    isExpression,
    isSlang,
    isAbuse,
    isAbbreviation,
    category,
    existsCategory,
  } = params;

  let url: string = '';
  entity === 'word' && (url = '/api/words/word');
  entity === 'category' && (url = '/api/categories/category');

  if (!url) {
    return;
  }

  let requestData: object = {};
  entity === 'word' &&
    (requestData = {
      ruValue,
      enValue,
      transcription,
      isExpression,
      isSlang,
      isAbuse,
      isAbbreviation,
      category: existsCategory,
    });
  entity === 'category' && (requestData = { category_label: category });

  let successMessage: string = '';
  entity === 'word' && (successMessage = 'Слово успешно создано');
  entity === 'category' && (successMessage = 'Категория успешно создана');

  let errorMessage: string = '';
  entity === 'word' && (errorMessage = 'Не удалось создать слово');
  entity === 'category' && (errorMessage = 'Не удалось создать категорию');

  let duplicateMessage: string = '';
  entity === 'word' && (duplicateMessage = 'Данное слово уже существует');
  entity === 'category' && (duplicateMessage = 'Данная категория уже существует');

  dispatch(showGlobalLoading());
  await sleep(500);

  try {
    const { data }: { data: IResponse } = await axios.post(url, requestData);
    if (data.status) {
      dispatch(showSnackbar(TSnackbar.SUCCESS, successMessage));
      dispatch(resetCreateFields());

      const { data: existCategories }: { data: IResponse } = await axios.get('/api/categories/categories');
      const categories = existCategories.result.map((item: ICategory) => item.category_label);
      dispatch(setExistCategories(categories));
    } else if ((data.error as Error).toString().includes('Duplicate entry')) {
      dispatch(showSnackbar(TSnackbar.ERROR, duplicateMessage));
    } else {
      dispatch(showSnackbar(TSnackbar.ERROR, errorMessage));
    }
  } catch (error: unknown) {
    if ((error as Error).toString().includes('Duplicate entry')) {
      dispatch(showSnackbar(TSnackbar.ERROR, duplicateMessage));
    } else {
      dispatch(showSnackbar(TSnackbar.ERROR, errorMessage));
    }
  }

  dispatch(hideGlobalLoading());
};

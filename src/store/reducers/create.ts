import { Reducer, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from '@rootReducer';
import { showGlobalLoading, hideGlobalLoading } from './global-loading';
import { showGlobalAlert, delayHideGlobalAlert, AlertTypes, showErrorGlobalAlert } from './global-alert';
import { IResponse } from '@utils/interfaces';
import axios from 'axios';
import { AsyncDispatch } from '@utils/types';

const SET_TYPE: string = 'SET_TYPE';
const SET_RU_VALUE: string = 'SET_RU_VALUE';
const SET_EN_VALUE: string = 'SET_EN_VALUE';
const SET_CATEGORY: string = 'SET_CATEGORY';
const SET_ENABLE_CATEGORIES: string = 'SET_ENABLE_CATEGORIES';
const SET_CHECKBOX_DATA: string = 'SET_CHECKBOX_DATA';

interface IState {
  type: string;
  ruValue: string;
  category: string;
  enValue: string;
  enableCategories: Array<string>;
  expression: boolean;
  slang: boolean;
  abuse: boolean;
  abbreviation: boolean;
}

const initialState: IState = {
  type: `word`,
  ruValue: '',
  category: '',
  enValue: '',
  enableCategories: [],
  expression: false,
  slang: false,
  abuse: false,
  abbreviation: false,
};

const create: Reducer<IState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      const hydrateState = action.payload.create;
      return { ...hydrateState };
    case SET_TYPE:
      return { ...state, type: action.payload };
    case SET_RU_VALUE:
      return { ...state, ruValue: action.payload };
    case SET_EN_VALUE:
      return { ...state, enValue: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_ENABLE_CATEGORIES:
      return { ...state, enableCategories: action.payload };
    case SET_CHECKBOX_DATA:
      const { type, check } = action.payload;
      if ([`expression`, `slang`, `abuse`, `abbreviation`].includes(type)) {
        return { ...state, [type]: check };
      }

      return { ...state };
    default:
      return { ...state };
  }
};

export default create;

interface ISetCheckboxData {
  type: string;
  check: boolean;
}

export const setType = (type: string) => action<string>(SET_TYPE, type);
export const setRuValue = (value: string) => action<string>(SET_RU_VALUE, value);
export const setEnValue = (value: string) => action<string>(SET_EN_VALUE, value);
export const setCategory = (category: string) => action<string>(SET_CATEGORY, category);
export const setEnabledCategories = (categories: Array<string>) =>
  action<Array<string>>(SET_ENABLE_CATEGORIES, categories);
export const setCheckboxData = (type: string, check: boolean) =>
  action<ISetCheckboxData>(SET_CHECKBOX_DATA, { type, check });

export const createWordOrCategory = (type: string, params: object) => async (dispatch: AsyncDispatch) => {
  dispatch(showGlobalLoading());

  try {
    const url: string = type === 'word' ? `/api/words/word` : `/api/categories/category`;
    const {
      data: { status, error },
    }: { data: IResponse } = await axios.post(url, params);

    if (status) {
      dispatch(
        showGlobalAlert(AlertTypes.SUCCESS, `${type.charAt(0).toUpperCase() + type.slice(1)} successfully save!`)
      );
    } else {
      let label = `Произошла ошибка при создании нового слова!`;

      if (error.message) {
        const { message } = error;
        label = `${type.charAt(0).toUpperCase() + type.slice(1)} did not save!`;
        message.includes(`Duplicate entry`) && (label += ` This ${type} already exists!`);
      }

      showErrorGlobalAlert(dispatch, label, error);
    }

    delayHideGlobalAlert(dispatch, 1500);
  } catch (error: any) {
    showErrorGlobalAlert(dispatch, `Error with save ${type}!`, error);
  }

  dispatch(hideGlobalLoading());
};

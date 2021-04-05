import axios from 'axios';

import { getAction } from '@rootReducer';
import { AsyncDispatch } from '@utils/types';
import { IResponse } from '@utils/interfaces';
import { showSnackbar } from '@reducers/snackbar/creators';
import { TSnackbar } from '@reducers/snackbar/types';

import { SET_REMEMBER, SET_USE_ABUSE } from './actions';

export const setUseAbuse = (useAbuse: boolean) => getAction<boolean>(SET_USE_ABUSE, useAbuse);
export const simpleSetRemember = (remember: boolean) => getAction<boolean>(SET_REMEMBER, remember);

export const setRemember = (userId: number, remember: boolean) => async (dispatch: AsyncDispatch): Promise<void> => {
  try {
    const { data }: { data: IResponse } = await axios.put(`/api/users/remember`, { userId, remember });

    if (data.status) {
      dispatch(simpleSetRemember(remember));
    } else {
      dispatch(
        showSnackbar(TSnackbar.WARNING, 'Не удалось сохранить пользователя авторизированным на стороне сервера!')
      );
    }
  } catch (error: unknown) {
    dispatch(showSnackbar(TSnackbar.WARNING, 'Не удалось сохранить пользователя авторизированным!'));
  }
};

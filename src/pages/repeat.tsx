import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';

import { setRepeatWordInfo } from '@reducers/repeat';
import { ReducersState } from '@store';
import { AxiosResponse } from '@utils/types';
import { getHost, printLog } from '@utils/functions';
import Containers from '@containers';

const repeatPage: NextPage = (): ReactElement => {
  return (
    <Containers.MainLayout>
      <Containers.RepeatPageWrapper />
    </Containers.MainLayout>
  );
};

repeatPage.getInitialProps = async ({ req, store }: NextPageContext<ReducersState>) => {
  try {
    const host: string = getHost(req);

    const { isAuth, userId } = store.getState().auth;
    const { useAbuse } = store.getState().settings;
    const url: string = isAuth ? `${host}/api/users-words/guess-word?userId=${userId}` : `${host}/api/words/guess-word`;

    const { data }: AxiosResponse = await axios.get(url, { params: { useAbuse } });
    const { status, result, error } = data;

    if (!result.length) {
      printLog(`Empty result from server!`);
      return {};
    }

    if (status && !error) {
      const [words] = result;
      store.dispatch(setRepeatWordInfo(words));
    } else {
      throw new Error(`Status get words is false! Error: ${error}`);
    }
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  return {};
};

export default connect()(repeatPage);

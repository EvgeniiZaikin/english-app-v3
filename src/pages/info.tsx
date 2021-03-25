import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';

import Containers from '@containers';
import Presentations from '@presentations';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { AxiosResponse } from '@utils/types';
import { getHost, printLog } from '@utils/functions';
import axios from 'axios';

interface IInfoPageProps {
  wordsCount: number;
}

const InfoPage: NextPage<IInfoPageProps> = ({ wordsCount }): ReactElement => {
  return (
    <Containers.MainLayout>
      <Presentations.InfoText wordsCount={wordsCount} />
    </Containers.MainLayout>
  );
};

InfoPage.getInitialProps = async ({ req, store }: NextPageContext<ReducersState>) => {
  let wordsCount: number = 0;

  try {
    const host: string = getHost(req);

    const { data }: AxiosResponse = await axios.get(`${host}/api/words/count`);
    const [count] = data.result;
    wordsCount = count;
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  store.dispatch(setFooterItemIndex(2));

  return { wordsCount };
};

export default connect()(InfoPage);

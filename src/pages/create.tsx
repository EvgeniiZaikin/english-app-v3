import Containers from '@containers';
import { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { connect } from 'react-redux';
import axios from 'axios';
import { AxiosResponse, ICategory } from '@utils/types';
import { getHost, printLog } from '@utils/functions';
import { setFooterItemIndex } from '@reducers/footer/creators';
import { setExistCategories } from '@reducers/create/creators';

const CreatePage: NextPage = (): ReactElement => (
  <div>
    <Head>
      <title>English words app - создание слова или категории</title>
    </Head>
    <Containers.MainLayout>
      <Containers.CreatePageWrapper />
    </Containers.MainLayout>
  </div>
);

CreatePage.getInitialProps = async ({ req, store }: NextPageContext) => {
  try {
    const host: string = getHost(req);

    const { data }: AxiosResponse = await axios.get(`${host}/api/categories/categories`);
    const categories: string[] = data.result.map((item: ICategory) => item.category_label);
    store.dispatch(setExistCategories(categories));
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  store.dispatch(setFooterItemIndex(1));

  return {};
};

export default connect()(CreatePage);

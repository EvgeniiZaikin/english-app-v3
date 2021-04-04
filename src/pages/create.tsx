import Containers from '@containers';
import { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { connect } from 'react-redux';
import axios from 'axios';
import { AxiosResponse } from '@utils/types';
import { getHost, printLog } from '@utils/functions';
import { setFooterItemIndex } from '@reducers/footer/creators';

interface ICategory {
  category_id: number;
  category_label: string;
  categoru_count_views: number;
}

interface ICreatePageProps {
  categories: Array<string>;
}

const CreatePage: NextPage<ICreatePageProps> = ({ categories }): ReactElement => (
  <div>
    <Head>
      <title>English words app - создание слова или категории</title>
    </Head>
    <Containers.MainLayout>
      <Containers.CreatePageWrapper categories={categories} />
    </Containers.MainLayout>
  </div>
);

CreatePage.getInitialProps = async ({ req, store }: NextPageContext) => {
  let categories: Array<string> = [];

  try {
    const host: string = getHost(req);

    const { data }: AxiosResponse = await axios.get(`${host}/api/categories/categories`);
    categories = data.result.map((item: ICategory) => item.category_label);
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  store.dispatch(setFooterItemIndex(1));

  return { categories };
};

export default connect()(CreatePage);

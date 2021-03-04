import Containers from '@containers';
import { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEnabledCategories } from '@reducers/create';
import { AxiosResponse } from '@utils/types';
import { getHost, printLog } from '@utils/functions';

interface ICategory {
  category_id: number;
  category_label: string;
  categoru_count_views: number;
}

const createPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Containers.CreatePageWrapper />
  </Containers.MainLayout>
);

createPage.getInitialProps = async ({ req, store }: NextPageContext) => {
  try {
    const host: string = getHost(req);

    const { data }: AxiosResponse = await axios.get(`${host}/api/categories/categories`);
    const categories: Array<string> = data.result.map((item: ICategory) => item.category_label);

    store.dispatch(setEnabledCategories(categories));
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  return {};
};

export default connect()(createPage);

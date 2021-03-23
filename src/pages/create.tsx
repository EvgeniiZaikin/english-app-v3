import Containers from '@containers';
import { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEnabledCategories } from '@reducers/create';
import { AxiosResponse } from '@utils/types';
import { getHost, printLog } from '@utils/functions';
import { setFooterItemIndex } from '@reducers/footer';

interface ICategory {
  category_id: number;
  category_label: string;
  categoru_count_views: number;
}

const CreatePage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Containers.CreatePageWrapper />
  </Containers.MainLayout>
);

CreatePage.getInitialProps = async ({ req, store }: NextPageContext) => {
  try {
    const host: string = getHost(req);

    const { data }: AxiosResponse = await axios.get(`${host}/api/categories/categories`);
    const categories: Array<string> = data.result.map((item: ICategory) => item.category_label);

    store.dispatch(setEnabledCategories(categories));
  } catch (error: unknown) {
    printLog((error as Error).toString());
  }

  store.dispatch(setFooterItemIndex(1));

  return {};
};

export default connect()(CreatePage);

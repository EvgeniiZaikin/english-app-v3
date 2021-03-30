import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import Wrappers from '@wrappers';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { connect } from 'react-redux';
import Head from 'next/head';

const SearchPage: NextPage = (): ReactElement => (
  <div>
    <Head>
      <title>English words app - поиск слова</title>
    </Head>
    <Containers.MainLayout>
      <Wrappers.SearchPageWrapper>
        <Containers.SearchInfo />
        <Containers.SearchInput />
        <Containers.SearchButton />
      </Wrappers.SearchPageWrapper>
    </Containers.MainLayout>
  </div>
);

SearchPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(null));

  return {};
};

export default connect()(SearchPage);

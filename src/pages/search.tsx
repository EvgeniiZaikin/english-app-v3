import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import Wrappers from '@wrappers';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { connect } from 'react-redux';

const SearchPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Wrappers.SearchPageWrapper>
      <Containers.SearchInfo />
      <Containers.SearchInput />
      <Containers.SearchButton />
    </Wrappers.SearchPageWrapper>
  </Containers.MainLayout>
);

SearchPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(null));

  return {};
};

export default connect()(SearchPage);

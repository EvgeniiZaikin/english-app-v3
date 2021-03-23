import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import Presentations from '@presentations';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { connect } from 'react-redux';

const SearchPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Presentations.SearchPageWrapper>
      <Containers.SearchInput />
      <Containers.SearchInfo />
    </Presentations.SearchPageWrapper>
  </Containers.MainLayout>
);

SearchPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(null));

  return {};
};

export default connect()(SearchPage);

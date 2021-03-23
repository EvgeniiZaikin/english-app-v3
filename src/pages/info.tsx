import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';

import Containers from '@containers';
import Presentations from '@presentations';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';

const InfoPage: NextPage = (): ReactElement => {
  return (
    <Containers.MainLayout>
      <Presentations.InfoText />
    </Containers.MainLayout>
  );
};

InfoPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(2));

  return {};
};

export default connect()(InfoPage);

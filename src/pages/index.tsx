import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { connect } from 'react-redux';

const AuthPage: NextPage = (): ReactElement => (
  <Containers.MainLayout>
    <Containers.AuthPageWrapper />
  </Containers.MainLayout>
);

AuthPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(null));

  return {};
};

export default connect()(AuthPage);

import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';
import Containers from '@containers';
import { ReducersState } from '@store';
import { setFooterItemIndex } from '@reducers/footer';
import { connect } from 'react-redux';
import Head from 'next/head';

const AuthPage: NextPage = (): ReactElement => (
  <div>
    <Head>
      <title>English words app - авторизация</title>
    </Head>
    <Containers.MainLayout>
      <Containers.AuthPageWrapper />
    </Containers.MainLayout>
  </div>
);

AuthPage.getInitialProps = async ({ store }: NextPageContext<ReducersState>) => {
  store.dispatch(setFooterItemIndex(null));

  return {};
};

export default connect()(AuthPage);

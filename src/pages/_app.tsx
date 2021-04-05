import React from 'react';
import Head from 'next/head';
import App, { AppInitialProps, AppContext } from 'next/app';

import { wrapper } from '@store';
import Containers from '@containers';
import '../assets/styles/reset.scss';
import '../assets/styles/global.scss';
import { getHost, printLog } from '@utils/functions';
import { AxiosResponse } from '@utils/types';
import axios from 'axios';
import { loginUser, setLogin, setPassword, setUserId } from '@reducers/auth/creators';
import { setUseAbuse, simpleSetRemember } from '@reducers/settings';
import nextCookies from 'next-cookies';

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    try {
      const host: string = getHost(ctx.req);

      if (ctx.req) {
        const { remember, useAbuse } = nextCookies(ctx);

        if (remember) {
          const { data }: AxiosResponse = await axios.get(`${host}/api/users`, { params: { userId: remember } });

          if (data.status && data.result.length) {
            const user = data.result[0];
            ctx.store.dispatch(setUserId(user.user_id));
            ctx.store.dispatch(setLogin(user.user_login));
            ctx.store.dispatch(setPassword(user.user_password));
            ctx.store.dispatch(loginUser());
            ctx.store.dispatch(simpleSetRemember(true));
          } else {
            printLog((data.error as Error).toString());
          }
        }

        ctx.store.dispatch(setUseAbuse(useAbuse === 'true'));
      }
    } catch (error: unknown) {
      printLog((error as Error).toString());
    }

    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        pathname: ctx.pathname,
      },
    };
  };

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content={`width=device-width, minimum-scale=1.0, initial-scale=1.0, 
                            maximum-scale=1.0, user-scalable=no, viewport-fit=cover`}
          />
          <title>English words app</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />

        <Containers.GlobalLoading />
        <Containers.Snackbar />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);

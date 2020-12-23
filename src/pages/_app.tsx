import React from 'react';
import Head from 'next/head';
import App, { AppInitialProps, AppContext } from 'next/app';
import { wrapper } from '../store';
import '../assets/styles/reset.scss';
import '../assets/styles/global.scss';

class MyApp extends App<AppInitialProps> {
    public static getInitialProps = async ({Component, ctx}: AppContext) => {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                pathname: ctx.pathname,
            },
        };
    };

    public render() {
        const {Component, pageProps} = this.props;

        return (
            <>
                <Head>
                    <meta 
                        name="viewport" 
                        content={
                            `width=device-width, minimum-scale=1.0, initial-scale=1.0, 
                            maximum-scale=1.0, user-scalable=no, viewport-fit=cover`
                        } 
                    />
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default wrapper.withRedux(MyApp);
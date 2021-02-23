import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import Containers from '@containers';
import { setRepeatWordInfo } from '@reducers/repeat';
import { reducersState } from '@store';
import { AxiosResponse } from '@utils/types';
import { getHost } from '@utils/functions';

const repeatPage: NextPage = () : ReactElement => {
    return (
        <Containers.MainLayout>
            <Containers.RepeatPageWrapper />
        </Containers.MainLayout>
    );
};

repeatPage.getInitialProps = async ({ req, store } : NextPageContext<reducersState>) => {
    try {
        const host: string = getHost(req);

        const { isAuth, userId } = store.getState().auth;
        const url: string = isAuth ?
            `${ host }/api/users-words/guess-word?userId=${ userId }` :
            `${ host }/api/words/guess-word`;

        const { data }: AxiosResponse = await axios.get(url);
        const { status, result, error } = data;
        console.log(result, status, error);

        if (!result.length) {
            console.log(`Empty result from server!`);
            return {};
        }

        if (status && !error) {
            const [ words ] = result;
            store.dispatch(setRepeatWordInfo(words));
        } else {
            throw new Error(`Status get words is false! Error: ${error}`);
        }
    } catch (error: any) {
        console.log(error);
    }

    return {};
};

export default connect()(repeatPage);
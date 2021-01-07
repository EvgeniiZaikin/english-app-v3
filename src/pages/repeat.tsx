import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import Containers from '@containers';
import { setRepeatWordInfo } from '../store/reducers/repeat';

interface IRepeatWord {
    word: string,
    wordId: number,
    category: string,
    rightEnValue: string,
    enValues: Array<string>,
};

interface IResponse {
    status: boolean,
    result: Array<IRepeatWord>,
    error: any,
};

const repeatPage: NextPage = () : ReactElement => {
    return (
        <Containers.MainLayout>
            
        </Containers.MainLayout>
    );
};

repeatPage.getInitialProps = async ({ req, store } : NextPageContext) => {
    try {
        let host: string = '';
        if (process.browser) host = window.location.origin;
        else if (req) host = `http://${ req.headers.host }`;
        else {
            throw new Error(`Can not get request object!`);
        }

        const { data }: { data: IResponse } = await axios.get(`${ host }/api/words/guess-words`);
        const { status, result, error } = data;
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
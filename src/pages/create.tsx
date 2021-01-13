import Containers from '@containers';
import { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEnabledCategories } from '@reducers/create';
import { IResponse } from '@utils/interfaces';

interface ICategory {
    category_id: number,
    category_label: string,
    categoru_count_views: number,
};

const createPage: NextPage = () : ReactElement => (
    <Containers.MainLayout>
        <Containers.CreatePageWrapper />
    </Containers.MainLayout>
);

createPage.getInitialProps = async ({ req, store } : NextPageContext) => {
    try {
        let host: string = '';
        if (process.browser) host = window.location.origin;
        else if (req) host = `http://${ req.headers.host }`;
        else {
            throw new Error(`Can not get request object!`);
        }

        const { data }: { data: IResponse } = await axios.get(`${ host }/api/categories/categories`);
        const categories: Array<string> = data.result.map((item: ICategory) => item.category_label);
        store.dispatch(setEnabledCategories(categories));
    } catch (error: any) {
        console.log(error);
    }

    return {};
};

export default connect()(createPage);
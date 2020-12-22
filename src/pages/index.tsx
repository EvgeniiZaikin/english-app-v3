import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Test from '../components/test';

const indexPage: NextPage = () => {
    return (
        <>
            <div>Hello World Next - Typescript - Express</div>
            <Test />
        </>
    );
};

indexPage.getInitialProps = ({ store, pathname } : NextPageContext) => {
    console.log('2. Page.getInitialProps uses the store to dispatch things');
    store.dispatch({ type: 'TICK', payload: 'GET INITIAL PROPS SUKA was set in error page ' + pathname });

    return {};
};

export default connect(state => state)(indexPage);
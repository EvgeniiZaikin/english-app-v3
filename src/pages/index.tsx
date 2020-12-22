import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Test from '../components/test';
import { setTick } from '../store/reducers/test';
import Presentations from '../components/presentations';

const indexPage: NextPage = () => {
    return (
        <>
            <div>Hello World Next - Typescript - Express</div>
            <Test />
            <Presentations.NavigationItem action={() => {}} />
        </>
    );
};

indexPage.getInitialProps = ({ store, pathname } : NextPageContext) => {
    console.log('2. Page.getInitialProps uses the store to dispatch things');
    // store.dispatch({ type: 'TICK', payload: 'GET INITIAL PROPS SUKA was set in error page ' + pathname });
    store.dispatch(setTick('GET INITIAL PROPS SUKA was set in error page ' + pathname));
    return {};
};

export default connect(state => state)(indexPage);
import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import styles, { footer, layout__footer } from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';
import { Dispatch } from 'redux';
import { toggleNavigationFullsize } from '@reducers/navigation';
import { setAppTheme } from '@reducers/theme';
import { logoutUser } from '@reducers/auth';

interface IProps {
    fullNavigation: boolean,
    appTheme: string,
    isAuth: boolean,
    router: NextRouter,
    toggleAppTheme: Function,
    openNavigation: Function,
    hideNavigation: Function,
    logout: Function,
};

const footerBlock: FC<IProps> = ({ 
    fullNavigation, appTheme, isAuth, router, toggleAppTheme, openNavigation, hideNavigation, logout
}) : ReactElement => {
    const footerStyle = styles[ fullNavigation ?  `layout__footer_show` : `layout__footer_hide` ];

    const loginUser = () => router.push('/auth');
    const logoutUser = () => {
        logout();
        router.push('/auth');
    };
    const authAction = isAuth ? logoutUser : loginUser;

    return (
        <footer className={ `${ footer } ${ footerStyle }` }>
            <div className={ layout__footer }>
                <Presentations.NavigationItem type={ isAuth ? 'logout' : 'auth' } action={ authAction } />
                <Presentations.NavigationItem type={`repeat`} action={ () => router.push('/repeat') }/>
                <Presentations.NavigationItem type={`create`} action={ () => router.push('/create') } />
                <Presentations.NavigationItem type={`more`} action={ openNavigation } />
            </div>
            <div className={ layout__footer }>
                <Presentations.NavigationItem type={`info`} action={ () => router.push('/info') } />
                <Presentations.NavigationItem type={`search`} action={ () => router.push('/search') } />
                <Presentations.NavigationItem type={`theme`} action={ () => toggleAppTheme(appTheme) } />
                <Presentations.NavigationItem type={`close`} action={ hideNavigation } />
            </div>
        </footer>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { 
        navigation: { fullsize }, 
        theme: { theme },
        auth: { isAuth },
    } = state;

    return {
        fullNavigation: fullsize,
        appTheme: theme,
        isAuth,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const toggleAppTheme = (theme: string) => dispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));

    const openNavigation = () => dispatch(toggleNavigationFullsize(true));
    const hideNavigation = () => dispatch(toggleNavigationFullsize(false));

    const logout = () => dispatch(logoutUser());

    return {
        toggleAppTheme,
        openNavigation,
        hideNavigation,
        logout,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(footerBlock));
import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import styles, { footer, layout__footer } from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { NextRouter, withRouter } from 'next/router';
import { Dispatch } from 'redux';
import { toggleNavigationFullsize } from '@reducers/navigation';
import { setAppTheme } from '@reducers/theme';

interface IProps {
    fullNavigation: boolean,
    appTheme: string,
    router: NextRouter,
    toggleAppTheme: Function,
    openNavigation: Function,
    hideNavigation: Function,
};

const footerBlock: FC<IProps> = ({ fullNavigation, appTheme, router, toggleAppTheme, openNavigation, hideNavigation }) : ReactElement => {
    const footerStyle = styles[ fullNavigation ?  `layout__footer_show` : `layout__footer_hide` ];

    return (
        <footer className={ `${ footer } ${ footerStyle }` }>
            <div className={ layout__footer }>
                <Presentations.NavigationItem type={`auth`} action={ () => router.push('/') } />
                <Presentations.NavigationItem type={`repeat`} action={ () => router.push('/repeat') }/>
                <Presentations.NavigationItem type={`create`} action={ () => router.push('/create') } />
                <Presentations.NavigationItem type={`more`} action={ openNavigation } />
            </div>
            <div className={ layout__footer }>
                <Presentations.NavigationItem type={`rules`} action={ () => router.push('/') } />
                <Presentations.NavigationItem type={`search`} action={ () => router.push('/search') } />
                <Presentations.NavigationItem type={`theme`} action={ () => toggleAppTheme(appTheme) } />
                <Presentations.NavigationItem type={`close`} action={ hideNavigation } />
            </div>
        </footer>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { navigation: { fullsize }, theme: { theme } } = state;

    return {
        fullNavigation: fullsize,
        appTheme: theme,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const toggleAppTheme = (theme: string) => dispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));

    const openNavigation = () => dispatch(toggleNavigationFullsize(true));
    const hideNavigation = () => dispatch(toggleNavigationFullsize(false));

    return {
        toggleAppTheme,
        openNavigation,
        hideNavigation,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(footerBlock));
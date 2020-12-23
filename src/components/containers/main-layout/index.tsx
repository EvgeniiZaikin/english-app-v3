import { FunctionComponent, ReactElement } from 'react';
import Presentations from '../../presentations';
import { NextRouter, withRouter } from 'next/router';
import { connect } from 'react-redux';
import { reducersState } from '../../../store';
import { toggleNavigationFullsize } from '../../../store/reducers/navigation';
import { setAppTheme } from '../../../store/reducers/theme';
import { Dispatch } from 'redux';

import styles, { footer, layout__container, layout__content, layout__footer } from './styles.scss';

type LayoutProps = React.PropsWithChildren<{ 
    router: NextRouter,
    fullNavigation: boolean,
    openNavigation: Function,
    hideNavigation: Function,
    appTheme: string,
    toggleAppTheme: Function,
}>;

const Layout: FunctionComponent<LayoutProps> = ({ children, router, fullNavigation, openNavigation, hideNavigation, appTheme, toggleAppTheme }) : ReactElement => {
    return (
        <div className={ `${ layout__container } ${ styles[`layout__container-${appTheme}`] }` }>
            <div className={ layout__content }>
                { children }
            </div>
            <footer className={ `${ footer } ${ styles[ `layout__footer-${fullNavigation ? `show` : `hide`}`] }` }>
                <div className={ layout__footer }>
                    <Presentations.NavigationItem action={ () => router.push('/') } />
                    <Presentations.NavigationItem type={`repeat`} action={ () => router.push('/repeat') }/>
                    <Presentations.NavigationItem type={`add`} action={ () => router.push('/add') } />
                    <Presentations.NavigationItem type={`more`} action={ openNavigation } />
                </div>
                <div className={ layout__footer }>
                    <Presentations.NavigationItem type={`statistic`} action={ () => router.push('/') } />
                    <Presentations.NavigationItem type={`search`} action={ () => router.push('/search') } />
                    <Presentations.NavigationItem type={`theme`} action={ () => toggleAppTheme(appTheme) } />
                    <Presentations.NavigationItem type={`close`} action={ hideNavigation } />
                </div>
            </footer>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { navigation, theme } = state;

    return {
        fullNavigation: navigation.fullsize,
        appTheme: theme.theme,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
import { FunctionComponent, ReactElement } from 'react';
import Containers from '@containers';
import { connect } from 'react-redux';
import { reducersState } from '@store';

import styles, { layout__container, layout__content } from './styles.scss';

type LayoutProps = React.PropsWithChildren<{
    appTheme: string,
}>;

const Layout: FunctionComponent<LayoutProps> = ({ children, appTheme }) : ReactElement => {
    const containerStyle = styles[ appTheme === `light` ? `layout__container_light` : `layout__container_dark` ];
    
    return (
        <div className={ `${ layout__container } ${ containerStyle }` }>
            <div className={ layout__content }>
                { children }
            </div>
           <Containers.Footer />
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { theme: { theme } } = state;

    return {
        appTheme: theme,
    };
};

export default connect(mapStateToProps)(Layout);
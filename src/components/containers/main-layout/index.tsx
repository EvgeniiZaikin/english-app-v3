import { FunctionComponent, ReactElement } from 'react';
import Containers from '@containers';

import { layout__container, layout__content } from './styles.scss';

type LayoutProps = React.PropsWithChildren<{}>;

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => (
  <div className={layout__container}>
    <Containers.Header />
    <div className={layout__content}>{children}</div>
    <Containers.Footer />
  </div>
);

export default Layout;

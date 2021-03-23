import { FC, ReactElement } from 'react';
import Presentations from '@presentations';

import { NextRouter, withRouter } from 'next/router';

import { layout__footer, footer__wrapper } from './styles.scss';

interface IProps {
  router: NextRouter;
}

const footerBlock: FC<IProps> = ({ router }): ReactElement => {
  return (
    <footer className={footer__wrapper}>
      <div className={layout__footer}>
        <Presentations.NavigationItem type="repeat" action={() => router.push('/repeat')} />
        <Presentations.NavigationItem type="create" action={() => router.push('/create')} />
      </div>
      <div className={layout__footer}>
        <Presentations.NavigationItem type="info" action={() => router.push('/info')} />
      </div>
    </footer>
  );
};

export default withRouter(footerBlock);

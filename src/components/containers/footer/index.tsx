import { FC, ReactElement } from 'react';
import { NextRouter, withRouter } from 'next/router';
import { connect } from 'react-redux';

import { ReducersState } from '@store';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';

import { footer__container, footer__item } from './styles.scss';

interface IFooterProps {
  router: NextRouter;
  itemIndex: number | null;
}

const Footer: FC<IFooterProps> = ({ router, itemIndex }): ReactElement => {
  return (
    <BottomNavigation className={footer__container} value={itemIndex} showLabels>
      <BottomNavigationAction
        onClick={() => router.push('/repeat')}
        className={footer__item}
        label="Повторять"
        icon={<SchoolIcon />}
      />
      <BottomNavigationAction
        onClick={() => router.push('/create')}
        className={footer__item}
        label="Добавить"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        onClick={() => router.push('/info')}
        className={footer__item}
        label="Описание"
        icon={<InfoIcon />}
      />
    </BottomNavigation>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    footer: { itemIndex },
  } = state;

  return { itemIndex };
};

export default connect(mapStateToProps)(withRouter(Footer));

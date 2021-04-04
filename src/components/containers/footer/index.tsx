import { FC, ReactElement } from 'react';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { getFooterActiveIndex } from '@reducers/footer/selectors';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';

import { IFooterProps } from './types';
import { footer__container, footer__item } from './styles.scss';

const Footer: FC<IFooterProps> = ({ router }): ReactElement => {
  const itemIndex = useSelector(getFooterActiveIndex);

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

export default withRouter(Footer);

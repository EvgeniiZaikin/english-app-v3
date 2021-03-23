import { FunctionComponent, ReactElement } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import { navitem__container, navitem__label } from './styles.scss';

interface IProps {
  action: Function;
  type?: string;
}

const navigationItem: FunctionComponent<IProps> = ({ action, type }): ReactElement => {
  let elem: React.ReactElement<SvgIconProps>;
  let text: string;

  switch (type) {
    case 'repeat':
      elem = <SchoolIcon />;
      text = `Повторять`;
      break;
    case 'create':
      elem = <AddIcon />;
      text = `Создать`;
      break;
    case 'info':
      elem = <InfoIcon />;
      text = `Информация`;
      break;
    default:
      elem = <HomeIcon />;
      text = ` Не определенно`;
      break;
  }

  return (
    <div className={navitem__container} onClick={() => action()}>
      {elem}
      <span className={navitem__label}>{text}</span>
    </div>
  );
};

export default navigationItem;

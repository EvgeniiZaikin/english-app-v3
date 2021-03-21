import { ReactElement, FC } from 'react';
import Button from '@material-ui/core/Button';
import { button as buttonStyles } from './styles.scss';

interface IProps {
  click: (event: React.MouseEvent<HTMLElement>) => void;
  disabled: boolean;
  icon: ReactElement;
  title: string;
}

const button: FC<IProps> = ({ click, disabled, icon, title }): ReactElement => (
  <Button
    className={buttonStyles}
    onClick={click}
    variant="contained"
    size="large"
    color="primary"
    startIcon={icon}
    disabled={disabled}
    fullWidth={true}
  >
    {title}
  </Button>
);

export default button;

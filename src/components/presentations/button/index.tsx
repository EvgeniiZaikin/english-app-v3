import { ReactElement, FC } from 'react';
import Button from '@material-ui/core/Button';
import { button_light, button_dark } from './styles.scss';

interface IProps {
    click: (event: React.MouseEvent<HTMLElement>) => void,
    disabled: boolean,
    icon: ReactElement,
    title: string,
    theme: string,
};

const button: FC<IProps> = ({ click, disabled, icon, title, theme }) : ReactElement => {
    const classes: string = theme === 'light' ? button_light : button_dark;

    return (
        <Button
            className={ classes }
            onClick={ click } 
            variant="contained" 
            size="large" 
            color="primary" 
            startIcon={ icon } 
            disabled={ disabled }
            fullWidth={ true }
        >{ title }</Button>
    );
};

export default button;
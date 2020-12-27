import { ReactElement, FC } from 'react';
import Button from '@material-ui/core/Button';

interface IProps {
    click: (event: React.MouseEvent<HTMLElement>) => void,
    disabled: boolean,
    icon: ReactElement,
    title: string,
};

const button: FC<IProps> = ({ click, disabled, icon, title }) : ReactElement => {
    return (
        <Button 
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
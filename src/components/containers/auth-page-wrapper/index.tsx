import { FC, ReactElement, useState } from 'react';
import Containers from '@containers';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { container } from './styles.scss';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Presentations from '@presentations';

const authPageWrapper: FC<{}> = () : ReactElement => {
    const [ remember, setRemember ] = useState<boolean>(false);
    const changeRemember = () => setRemember(!remember);

    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#008000',
            contrastText: '#fff',
          },
        },
    });

    return (
        <div className={ container }>
            <Presentations.HelperLabel 
                text={ `
                    Авторизация поможет приложению лучше подбирать слова на повтор исходя из ваших ответов.
                    Без авторизации можно продолжать пользоваться приложением, но слова будут выбираться на основе общих данных.
                ` }
            />

            <Containers.LoginInput />
            <Containers.PasswordInput />

            <FormControlLabel
                control={
                <Checkbox
                    checked={ remember }
                    onChange={ changeRemember }
                    name="checkedB"
                    color="primary"
                />
                }
                label="Запомнить"
            />

            <Presentations.HelperLabel 
                text='Если вы здесь впервые и нет еще аккаунта, то вам нужно нажать эту кнопку.'
            />

            <Containers.AuthButton label='Регистрация и авторизация' withRegistration={ true } />

            <Presentations.HelperLabel 
                text='Если у вас уже есть аккаунт, то вам нужно нажать эту кнопку.'
            />

            <Containers.AuthButton label='Авторизация' />
        </div>
    );
};

export default authPageWrapper;
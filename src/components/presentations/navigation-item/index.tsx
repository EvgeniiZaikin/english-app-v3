import { FunctionComponent, ReactElement } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import { navitem__container, navitem__label } from './styles.scss';

interface IProps {
    action: Function,
    type?: string,
};
 
const navigationItem: FunctionComponent<IProps> = ({ action, type }) : ReactElement => {
    let elem: React.ReactElement<SvgIconProps>;
    let text: string;
    
    switch (type) {
        case 'auth':
            elem = <TransferWithinAStationIcon />;
            text = `Авторизация`;
            break;
        case 'logout':
            elem = <TransferWithinAStationIcon />;
            text = `Выйти`;
            break;
        case 'repeat':
            elem = <SchoolIcon />;
            text = `Повторять`;
            break;
        case 'create':
            elem = <AddIcon />;
            text = `Создать`;
            break;
        case 'more':
            elem = <MoreHorizIcon />;
            text = `Ещё`;
            break;
        case 'search':
            elem = <SearchIcon />;
            text = `Поиск`;
            break;
        case 'close':
            elem = <CloseIcon />;
            text = `Закрыть`;
            break;
        case 'theme':
            elem = <Brightness4Icon />;
            text = `Тема`;
            break;
        case 'rules':
            elem = <MenuBookIcon />
            text = `Правила`;
            break;
        default:
            elem = <HomeIcon />;
            text = ` Не определенно`;
            break;
    }

    return (
        <div className={ navitem__container } onClick={ () => action() }>
            { elem }
            <span className={ navitem__label }>{ text }</span>
        </div>
    );
};

export default navigationItem;
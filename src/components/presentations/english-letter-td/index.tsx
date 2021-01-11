import { FC, ReactElement } from 'react';
import { letter, letter_up, letter_down } from './styles.scss';

interface IProps {
    symbol: string,
    hide: boolean,
};

const englishLetterTd: FC<IProps> = ({ symbol, hide }) : ReactElement => {
    const style = `${ letter } ${ hide ? letter_down : letter_up }`; 
    
    return (
        <td className={ style }>{ symbol }</td>
    );
};

export default englishLetterTd;
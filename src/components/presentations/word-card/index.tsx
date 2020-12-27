import { ReactElement, FC } from 'react';
import { wordCard__container, wordCard__word, wordCard__category } from './styles.scss';

interface IProps {
    word: string,
    category: string,
};

const wordCard: FC<IProps> = ({ word, category }) : ReactElement => {
    return (
        <div className={ wordCard__container }>
            <p className={ wordCard__word }>{ word }</p>
            <p className={ wordCard__category }>{ category }</p>
        </div>
    );
};

export default wordCard;
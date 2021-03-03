import { ReactElement, FC } from 'react';
import {
  wordCard__container,
  wordCard__word,
  wordCard__category,
  wordCard__container_dark,
  wordCard__container_light,
} from './styles.scss';

interface IProps {
  word: string;
  category: string;
  theme: string;
}

const wordCard: FC<IProps> = ({ word, category, theme }): ReactElement => {
  const containerTheme: string = theme === 'light' ? wordCard__container_light : wordCard__container_dark;

  return (
    <div className={`${wordCard__container} ${containerTheme}`}>
      <p className={wordCard__word}>{word}</p>
      <p className={wordCard__category}>{category}</p>
    </div>
  );
};

export default wordCard;

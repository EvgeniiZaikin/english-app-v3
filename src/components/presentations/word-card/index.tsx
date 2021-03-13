import { ReactElement, FC } from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

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
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
}

const wordCard: FC<IProps> = ({
  word,
  category,
  theme,
  isExpression,
  isSlang,
  isAbuse,
  isAbbreviation,
}): ReactElement => {
  const containerTheme: string = theme === 'light' ? wordCard__container_light : wordCard__container_dark;

  const style = { display: 'flex', justifyContent: 'start', marginBottom: '3px' };

  return (
    <div className={`${wordCard__container} ${containerTheme}`}>
      {isExpression ? (
        <Chip
          style={style}
          label="Выражение"
          variant="outlined"
          color="primary"
          size="small"
          avatar={<Avatar>В</Avatar>}
        />
      ) : null}
      {isSlang ? (
        <Chip style={style} label="Сленг" variant="outlined" color="primary" size="small" avatar={<Avatar>С</Avatar>} />
      ) : null}
      {isAbuse ? (
        <Chip style={style} label="Мат" variant="outlined" color="secondary" size="small" avatar={<Avatar>М</Avatar>} />
      ) : null}
      {isAbbreviation ? (
        <Chip
          style={style}
          label="Сокращение"
          variant="outlined"
          color="primary"
          size="small"
          avatar={<Avatar>С</Avatar>}
        />
      ) : null}
      <p className={wordCard__word}>{word}</p>
      <p className={wordCard__category}>{category}</p>
    </div>
  );
};

export default wordCard;

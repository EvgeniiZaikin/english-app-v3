import { FC, ReactElement } from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

interface IChipsProps {
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
}

const ChipItem: FC<{ label: string }> = ({ label }) => {
  const style = { display: 'flex', justifyContent: 'start', marginBottom: '3px' };

  return (
    <Chip
      style={style}
      label={label}
      variant="outlined"
      color={label === 'Мат' ? 'secondary' : 'primary'}
      size="small"
      avatar={<Avatar>{label[0].toUpperCase()}</Avatar>}
    />
  );
};

const Chips: FC<IChipsProps> = ({ isExpression, isSlang, isAbuse, isAbbreviation }): ReactElement => {
  return (
    <>
      {isExpression ? <ChipItem label="Выражение" /> : null}
      {isSlang ? <ChipItem label="Сленг" /> : null}
      {isAbuse ? <ChipItem label="Мат" /> : null}
      {isAbbreviation ? <ChipItem label="Выражение" /> : null}
    </>
  );
};

export default Chips;

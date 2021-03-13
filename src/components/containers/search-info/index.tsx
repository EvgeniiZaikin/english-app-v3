import { connect } from 'react-redux';
import { FC, ReactElement } from 'react';

import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { reducersState } from '@store';
import { searchWordInfo__container } from './styles.scss';

interface IProps {
  ruValue: string;
  enValue: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
}

const searchInfo: FC<IProps> = ({
  ruValue,
  enValue,
  category,
  isExpression,
  isSlang,
  isAbuse,
  isAbbreviation,
}): ReactElement => {
  const style = { display: 'flex', justifyContent: 'start', marginBottom: '3px' };

  return (
    <div className={searchWordInfo__container}>
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
      <List>
        <ListItem disableGutters={true}>
          <ListItemText style={{ fontWeight: 'bold' }} primary={ruValue} secondary={category} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disableGutters={true}>
          <ListItemText primary={enValue} />
        </ListItem>
      </List>
    </div>
  );
};

const mapStateToProps = (state: reducersState) => {
  const {
    search: { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation },
  } = state;
  return { ruValue, enValue, category, isExpression, isSlang, isAbuse, isAbbreviation };
};

export default connect(mapStateToProps)(searchInfo);

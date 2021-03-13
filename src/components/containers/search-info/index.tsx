import { connect } from 'react-redux';
import { FC, ReactElement } from 'react';

import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Presentations from '@presentations';

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
  return (
    <div className={searchWordInfo__container}>
      <Presentations.WordsTypesChips
        isExpression={isExpression}
        isSlang={isSlang}
        isAbuse={isAbuse}
        isAbbreviation={isAbbreviation}
      />
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

import { ReactElement, FC } from 'react';
import { connect } from 'react-redux';
import { ReducersState } from '@store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Button } from '@material-ui/core';

import { setSearchData } from '@reducers/search';

import { searchButton_button } from './styles.scss';

interface IProps {
  searchValue: string;
  search(value: string): void;
}

const nextButton: FC<IProps> = ({ searchValue, search }): ReactElement => {
  const handleSearch = () => search(searchValue);

  return (
    <Button
      className={searchButton_button}
      onClick={handleSearch}
      variant="contained"
      size="large"
      color="primary"
      disabled={!searchValue}
      fullWidth={true}
    >
      Найти
    </Button>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    search: { searchValue },
  } = state;
  return { searchValue };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducersState, void, AnyAction>) => {
  const search = (value: string) => dispatch(setSearchData(value, value));

  return { search };
};

export default connect(mapStateToProps, mapDispatchToProps)(nextButton);

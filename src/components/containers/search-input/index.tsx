import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FC, ReactElement, ChangeEvent } from 'react';

import Presentations from '@presentations';

import { ReducersState } from '@store';
import { setSearchValue } from '@reducers/search';

import { searchInput__container } from './styles.scss';

interface IProps {
  searchValue: string;
  setSearch(value: string): void;
}

const searchWordInput: FC<IProps> = ({ searchValue, setSearch }): ReactElement => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(event.target.value);

  return (
    <div className={searchInput__container}>
      <Presentations.Input value={searchValue} helper="RU или EN значение" onChange={handleOnChange} />
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    search: { searchValue },
  } = state;

  return { searchValue };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const setSearch = (value: string) => dispatch(setSearchValue(value));
  return { setSearch };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchWordInput);

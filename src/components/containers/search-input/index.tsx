import { useSelector, useDispatch } from 'react-redux';
import { FC, ReactElement, ChangeEvent } from 'react';

import Presentations from '@presentations';

import { setSearchValue } from '@reducers/search/creators';
import { getSearchValue } from '@reducers/search/selectors';

import { searchInput__container } from './styles.scss';

const SearchWordInput: FC = (): ReactElement => {
  const searchValue = useSelector(getSearchValue);

  const dispatch = useDispatch();
  const setSearch = (value: string) => dispatch(setSearchValue(value));

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(event.target.value);

  return (
    <div className={searchInput__container}>
      <Presentations.Input value={searchValue} helper="RU или EN значение" onChange={handleOnChange} />
    </div>
  );
};

export default SearchWordInput;

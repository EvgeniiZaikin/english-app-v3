import { ReactElement, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { setSearchData } from '@reducers/search/creators';
import { getSearchValue } from '@reducers/search/selectors';

import { searchButton_button } from './styles.scss';

const NextButton: FC = (): ReactElement => {
  const searchValue = useSelector(getSearchValue);

  const dispatch = useDispatch();
  const search = (value: string) => dispatch(setSearchData(value, value));

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

export default NextButton;

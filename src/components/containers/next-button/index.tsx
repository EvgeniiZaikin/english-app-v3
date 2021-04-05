import { ReactElement, FC } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useSelector, useDispatch } from 'react-redux';
import { setRepeatWordData } from '@reducers/repeat/creators';
import { Button } from '@material-ui/core';
import { getUserId, getIsAuth } from '@reducers/auth/selectors';
import { getFinished } from '@reducers/repeat/selectors';
import { getUseAbuse } from '@reducers/settings/selectors';

import { nextButton_button } from './styles.scss';

const NextButton: FC = (): ReactElement => {
  const userId = useSelector(getUserId);
  const isAuth = useSelector(getIsAuth);
  const disabled = !useSelector(getFinished);
  const useAbuse = useSelector(getUseAbuse);

  const dispatch = useDispatch();
  const nextWord = (id: number | null, auth: boolean, abuse: boolean) => dispatch(setRepeatWordData(id, auth, abuse));
  const handleNextWord = () => nextWord(userId, isAuth, useAbuse);

  return (
    <Button
      className={nextButton_button}
      onClick={handleNextWord}
      variant="contained"
      size="large"
      color="primary"
      startIcon={<NavigateNextIcon />}
      disabled={disabled}
      fullWidth={true}
    >
      Далее
    </Button>
  );
};

export default NextButton;

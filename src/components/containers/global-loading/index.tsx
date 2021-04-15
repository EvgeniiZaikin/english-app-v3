import { FC, ReactElement } from 'react';
import { connect, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getLoadingStatus } from '@reducers/loading/selectors';
import { backdrop__container } from './styles.scss';

const GlobalLoading: FC = (): ReactElement => {
  const show = useSelector(getLoadingStatus);

  return (
    <div className={backdrop__container}>
      <Backdrop open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default connect()(GlobalLoading);

import { FC, ReactElement } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
// import { ReducersState } from '@store';

import { backdrop__container } from './styles.scss';

interface IProps {
  show?: boolean;
}

const globalLoading: FC<IProps> = ({ show = false }): ReactElement => {
  return (
    <div className={backdrop__container}>
      <Backdrop open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

// const mapStateToProps = (state: ReducersState) => {
//   const {
//     backdrop: { show },
//   } = state;
//   return { show: false };
// };

// export default connect(mapStateToProps)(globalLoading);
export default connect()(globalLoading);

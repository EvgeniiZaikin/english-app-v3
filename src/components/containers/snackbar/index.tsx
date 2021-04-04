import React, { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { hideSnackbar } from '@reducers/snackbar/creators';
import { getSnackbarInfo } from '@reducers/snackbar/selectors';

const Snackbar: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { show, type, message } = useSelector(getSnackbarInfo);
  const handleClose = () => dispatch(hideSnackbar());

  return (
    <MuiSnackbar open={show} autoHideDuration={2500} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;

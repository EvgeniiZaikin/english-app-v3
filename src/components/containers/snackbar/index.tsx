import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { hideSnackbar, TSnackbar } from '@reducers/snackbar';
import { ReducersState } from '@store';
import { Dispatch } from 'redux';
import { IAction } from '@rootReducer';

interface ISnackbarProps {
  show: boolean;
  message: string;
  type: TSnackbar;
  handleClose(): IAction<unknown>;
}

const Snackbar: FC<ISnackbarProps> = ({ type, message, show, handleClose }): ReactElement => {
  return (
    <MuiSnackbar open={show} autoHideDuration={2500} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    snackbar: { show, type, message },
  } = state;

  return { show, type, message };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const handleClose = () => dispatch(hideSnackbar());

  return { handleClose };
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);

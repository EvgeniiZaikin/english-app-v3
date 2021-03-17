import { ReactElement, FC } from 'react';
import Alert, { Color } from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import { ReducersState } from '@store';
import { AlertTypes } from '@reducers/global-alert';

import { alert__container } from './styles.scss';

interface IProps {
  show: boolean;
  text: string;
  type: AlertTypes;
}

const globalAlert: FC<IProps> = ({ show, text, type }): ReactElement => {
  return (
    <div className={alert__container}>
      <Collapse in={show}>
        <Alert severity={type as Color}>{text}</Alert>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state: ReducersState) => {
  const {
    globalAlert: { show, text, type },
  } = state;
  return { show, text, type };
};

export default connect(mapStateToProps)(globalAlert);

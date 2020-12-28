import { ReactElement, FC } from 'react';
import Alert, { Color } from '@material-ui/lab/Alert';
import { alert__container } from './styles.scss';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import { reducersState } from '@store';
import { AlertTypes } from '../../../store/reducers/global-alert';

interface IProps {
    show: boolean,
    text: string,
    type: AlertTypes,
};

const globalAlert: FC<IProps> = ({ show, text, type }) : ReactElement => {
    return (
        <div className={ alert__container }>
            <Collapse in={ show }>
                <Alert severity={ type as Color }>{ text }</Alert>
            </Collapse>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { globalAlert: { show, text, type } } = state;
    return { show, text, type };
};

export default connect(mapStateToProps)(globalAlert);
import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { reducersState } from '../store';

interface IProps {
    tick: string,
};

const Test: FC<IProps> = ({ tick }) : ReactElement => (
    <p>{ tick }</p>
);

const mapStateToProps = (state: reducersState) => {
    return {
        tick: state.test.tick,
    }
};

export default connect(mapStateToProps)(Test);
import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { State } from '../store';

interface IProps {
    tick: string,
};

const Test: FC<IProps> = ({ tick }) : ReactElement => (
    <p>{ tick }</p>
);

const mapStateToProps = (state: State) => {
    return {
        tick: state.tick,
    }
};

export default connect(mapStateToProps)(Test);
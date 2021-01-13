import { ChangeEvent, FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setType } from '@reducers/create';

type IProps = {
    type: string,
    setCreateType: Function,
};

const typeRadioButtons: FC<IProps> = ({ setCreateType, type }) : ReactElement => {
    return (
        <Presentations.RadioButtons 
            change={ (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => setCreateType(event.target.value) }
            defaultValue={ type }
            rows={ [`word`, `category`] }
        />
    );
};

const mapStateToProps = (state: reducersState) => {
    const { create: { type } } = state;
    return { type };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const setCreateType = (value: string) => dispatch(setType(value));
    return { setCreateType };
};

export default connect(mapStateToProps, mapDispatchToProps)(typeRadioButtons);
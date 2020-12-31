import React, { FC, ReactElement } from 'react';
import Containers from '@containers';
import { layout__container, layout__wrap, layout__save } from './styles.scss';
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { reducersState } from '@store';

interface IProps {
    type: string,
};

const createPageWrapper: FC<IProps> = ({ type }) : ReactElement => {
    return (
        <div className={ layout__container }>
            <div className={ layout__wrap }>
                <Containers.TypeRadioButtons />
                <Divider />
                { type === `word` && <Containers.CategorySelect /> }
                <Containers.RuValueInput />
                { type === `word` && <Containers.EnValueInput /> }
                <div className={ layout__save }>
                    <Containers.SaveButton />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { create: { type } } = state;
    return { type };
};

export default connect(mapStateToProps)(createPageWrapper);
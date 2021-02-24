import { ReactElement, FC } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setCheckboxData } from '@reducers/create';
import { checkboxs__container, checkboxs__checkbox, checkboxs__wrapper, checkboxs__label } from './styles.scss';

interface IProps {
    expression: boolean, 
    slang: boolean, 
    abuse: boolean,
    abbreviation: boolean,
    setData: Function,
};

const checkboxs: FC<IProps> = ({ expression, slang, abuse, abbreviation, setData }) : ReactElement => {
    const MyCheckbox: FC<{ type: string, value: boolean, label: string }> = ({ type, value, label }): ReactElement => (
        <>
            <Checkbox onClick={ () => setData(type, !value) } color='primary' checked={ value } />
            <span onClick={ () => setData(type, !value) } className={ checkboxs__label }>{ label }</span>
        </>
    );

    return (
        <div className={ checkboxs__container }>
            <div className={ checkboxs__checkbox }>
                <MyCheckbox type='expression' value={ expression } label='Выражение' />
            </div>
            <div className={ checkboxs__checkbox }>
                <MyCheckbox type='abbreviation' value={ abbreviation } label='Абривиатура' />
            </div>
            <div className={ checkboxs__wrapper }>
                <div className={ checkboxs__checkbox }>
                    <MyCheckbox type='slang' value={ slang } label='Сленг' />
                </div>
                <div className={ checkboxs__checkbox }>
                    <MyCheckbox type='abuse' value={ abuse } label='Мат' />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { create: { expression, slang, abuse, abbreviation } } = state;
    return { expression, slang, abuse, abbreviation };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const setData = (type: string, check: boolean) => dispatch(setCheckboxData(type, check));
    return { setData };
};

export default connect(mapStateToProps, mapDispatchToProps)(checkboxs);
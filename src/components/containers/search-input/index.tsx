import { ChangeEvent, FC, ReactElement, FocusEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { searchInput__container } from './styles.scss';
import { reducersState } from '@store';
import { AnyAction } from 'redux';
import { setSearchData } from '../../../store/reducers/search';
import { ThunkDispatch } from 'redux-thunk';

type ChangeInput = ChangeEvent<HTMLInputElement>;
type FocusInput = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

interface IProps {
    search: Function,
};

let timer: null | NodeJS.Timeout = null;

const onInput: Function = (event: ChangeInput, changeData: Function) => {
    console.log(event.target.value);

    timer && clearTimeout(timer);
    console.log('start');
    event.target.value && (timer = setTimeout(() => {
        console.log('Axios query!');
        changeData(event.target.value);
    }, 1000));
    console.log('end');
};

const onBlur = () => {
    timer && clearTimeout(timer);
};

const onFocus = (event: FocusInput, changeData: Function) => {
    event.target.value && (timer = setTimeout(() => {
        console.log('Axios query!');
        changeData(event.target.value);
    }, 1000));
};

const searchWordInput: FC<IProps> = ({ search }) : ReactElement => {
    return (
        <div className={ searchInput__container }>
            <TextField 
                fullWidth={ true } 
                id="standard-search" 
                label="Поиск слов..." 
                type="search" 
                onInput={ event => onInput(event, search) } 
                onBlur={ onBlur } 
                onFocus={ event => onFocus(event, search) } 
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    const search = (value: string) => dispatch(setSearchData(value, value));
    return { search };
};

export default connect(null, mapDispatchToProps)(searchWordInput);
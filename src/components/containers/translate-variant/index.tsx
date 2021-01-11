import { ReactElement, FC, useState } from 'react';
import styles, { translateVariant__button } from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { finishRepeatWord, setRepeatWordStatus, updateWord } from '../../../store/reducers/repeat';

interface IProps {
    value: string,
    wordId: number | null,
    wordRuValue: string,
    rightEnValue: string,
    openNextButton: Function,
    setGuessedWordStatus: Function,
    finished: boolean,
    updateGuessedWord: Function,
};

const click: Function = (currentValue: string, rightValue: string, handler: Function, openNextButton: Function, setGuessedWordStatus: Function, update: Function) : void => {
    const status: string = currentValue === rightValue ? `success` : `error`;
    handler(status);
    openNextButton();
    setGuessedWordStatus(currentValue === rightValue);
    update(currentValue === rightValue);
};

const translateVariant: FC<IProps> = ({ value, rightEnValue, wordId, wordRuValue, openNextButton, setGuessedWordStatus, finished, updateGuessedWord }) : ReactElement => {
    const [ status, setStatus ] = useState('neutral');

    const buttonClass = `translateVariant__button_${status}`;
    const classes: string = `${translateVariant__button} ${buttonClass}`;
    const update: Function = (guessed: boolean) => {
        return updateGuessedWord({
            id: wordId,
            ruValue: wordRuValue,
            enValue: rightEnValue,
            incrementViews: true,
            success: guessed,
        });
    };

    return (
        <button disabled={ finished } className={ classes } onClick={ () => click(value, rightEnValue, setStatus, openNextButton, setGuessedWordStatus, update) }>
            { value }
        </button>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { repeat: { wordId, word, rightEnValue, finished } } = state;
    return { wordId, wordRuValue: word, rightEnValue, finished };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    const openNextButton = () => dispatch(finishRepeatWord());
    const setGuessedWordStatus = (guessed: boolean) => dispatch(setRepeatWordStatus(guessed));
    const updateGuessedWord = (params: object) => dispatch(updateWord(params));

    return {
        openNextButton,
        setGuessedWordStatus,
        updateGuessedWord,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(translateVariant);
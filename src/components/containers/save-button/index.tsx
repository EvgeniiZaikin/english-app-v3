import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { AnyAction } from 'redux';
import { createWordOrCategory } from '../../../store/reducers/create';
import { ThunkDispatch } from 'redux-thunk';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#008000',
        contrastText: '#fff',
      },
    },
});

interface IProps {
    type: string,
    ruValue: string | null,
    category: string,
    enValue: string | null,
    create: Function,
};

const saveButton: FC<IProps> = ({ 
    type, ruValue, category, enValue, create,
}) : ReactElement => {
    const disabled: boolean = 
        type === `word` ? !ruValue || !category || !enValue :
        type === `category` ? !ruValue : true;

    const save = () => {
        /*type === `word` ? createNewWord({ ruValue, enValue, category }) :
        type === `category` ? createNewCategory({ label: ruValue }) :*/
        try {
            create(type, { ruValue, category_label: ruValue, enValue, category });
        } catch (error) {
            alert('Something was wrong!');
        }
    };

    return (
        <ThemeProvider theme={ theme }>
            <Presentations.Button 
                click={ save }
                disabled={ disabled }
                icon={ <SaveIcon /> }
                title={ `Сохранить` }
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { create: { type, ruValue, enValue, category } } = state;
    return { type, ruValue, enValue, category };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<reducersState, void, AnyAction>) => {
    const create = (type: string, params: object) => dispatch(createWordOrCategory(type, params));
    return { create };
};

export default connect(mapStateToProps, mapDispatchToProps)(saveButton);
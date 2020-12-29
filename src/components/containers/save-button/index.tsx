import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';

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
};

const saveButton: FC<IProps> = ({ 
    type, ruValue, category, enValue,
}) : ReactElement => {
    const disabled: boolean = 
        type === `word` ? !ruValue || !category || !enValue :
        type === `category` ? !ruValue : true;

    const save = () => {
        /*type === `word` ? createNewWord({ ruValue, enValue, category }) :
        type === `category` ? createNewCategory({ label: ruValue }) :*/
        alert(`Wrong type for save action!`);
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(saveButton);
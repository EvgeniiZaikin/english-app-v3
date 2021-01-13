import { ChangeEvent, FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { connect } from 'react-redux';
import { reducersState } from '@store';
import { Dispatch } from 'redux';
import { setCategory } from '@reducers/create';

interface IProps {
    category: string,
    enableCategories: Array<string>,
    chooseCategory: Function,
};

const categorySelect: FC<IProps> = ({ category, enableCategories, chooseCategory }) : ReactElement => {
    return (
        <Presentations.Select 
            title={ `Категория` }
            value={ category }
            change={ (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => chooseCategory(event.target.value) }
            options={ enableCategories }
            error={ !category }
            helperText={ `Выберите категорию` }
        />
    );
};

const mapStateToProps = (state: reducersState) => {
    const { create: { category, enableCategories } } = state;
    return { category, enableCategories };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    const chooseCategory = (category: string) => dispatch(setCategory(category));
    return { chooseCategory };
};

export default connect(mapStateToProps, mapDispatchToProps)(categorySelect);
import { ReactElement, FC, Fragment } from 'react';
import { repeatPage_container, repeatPage__wordCard, repeatPage__nextButton } from './styles.scss';
import { connect } from 'react-redux';
import Presentations from '@presentations';
import Containers from '@containers';
import { reducersState } from '@store';

interface IProps {
    word: string,
    category: string,
    enValues: Array<string>,
};

const repeatPageWrapper: FC<IProps> = ({ word, category, enValues }) : ReactElement => {
    return (
        <div className={ repeatPage_container }>
            <div className={ repeatPage__wordCard }>
                <Presentations.WordCard word={ word } category={ category } />
            </div>
            <div>
                {
                    enValues.map((variant: string, index: number) => {
                        return (
                            <Fragment key={ index }>
                                <Containers.TranslateVariant value={ variant } />
                            </Fragment>
                        );
                    })
                }
            </div>
            <div className={ repeatPage__nextButton }>
                <Containers.NextButton />
            </div>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { repeat: { word, category, enValues } } = state;
    return { word, category, enValues };
};

export default connect(mapStateToProps)(repeatPageWrapper);
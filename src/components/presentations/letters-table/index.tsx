import { FC, ReactElement } from 'react';
import Presentations from '@presentations';
import { table, table_up, table_down } from './styles.scss';

interface IProps {
    hide: boolean,
};

const lettersTable: FC<IProps> = ({ hide }) : ReactElement => {
    const classes = `${ table } ${ hide ? table_down : table_up }`;

    return (
        <table className={ classes }>
            <tbody>
                <tr>
                    <Presentations.EnglishLetterTd symbol='A' hide={ hide } />
                    <Presentations.EnglishLetterTd symbol='B' hide={ hide } />
                </tr>
                <tr>
                    <Presentations.EnglishLetterTd symbol='C' hide={ hide } />
                    <Presentations.EnglishLetterTd symbol='D' hide={ hide } />
                </tr>
            </tbody>
        </table>
    );
};

export default lettersTable;
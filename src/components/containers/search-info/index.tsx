import { FC, ReactElement } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { searchWordInfo__container } from './styles.scss';
import { connect } from 'react-redux';
import { reducersState } from '@store';

interface IProps {
    ruValue: string,
    enValue: string,
    category: string,
};

const searchInfo: FC<IProps> = ({ ruValue, enValue, category }) : ReactElement => {
    return (
        <div className={ searchWordInfo__container }>
            <List>
                <ListItem disableGutters={ true }>
                    <ListItemText 
                        style={{ fontWeight: 'bold' }} 
                        primary={ ruValue } 
                        secondary={ category } 
                    />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disableGutters={ true }>
                    <ListItemText primary={ enValue } />
                </ListItem>
            </List>
        </div>
    );
};

const mapStateToProps = (state: reducersState) => {
    const { search: { ruValue, enValue, category } } = state;
    return { ruValue, enValue, category };
};

export default connect(mapStateToProps)(searchInfo);
import { getAction } from '@rootReducer';
import { SET_ITEM_INDEX } from './actions';

export const setFooterItemIndex = (itemIndex: number | null) => getAction(SET_ITEM_INDEX, itemIndex);

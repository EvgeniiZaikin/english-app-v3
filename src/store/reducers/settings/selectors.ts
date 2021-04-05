import { ReducersState } from '@store';

export const getIsRemember = (state: ReducersState) => state.settings.isRemember;
export const getUseAbuse = (state: ReducersState) => state.settings.useAbuse;

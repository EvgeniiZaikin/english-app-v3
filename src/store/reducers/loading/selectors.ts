import { ReducersState } from '@store';

export const getLoadingStatus = (state: ReducersState) => state.loading.show;

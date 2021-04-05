import { ReducersState } from '@store';

export const getSearchValue = (state: ReducersState) => state.search.searchValue;
export const getRuValue = (state: ReducersState) => state.search.ruValue;
export const getEnValue = (state: ReducersState) => state.search.enValue;
export const getCategory = (state: ReducersState) => state.search.category;
export const getIsExpression = (state: ReducersState) => state.search.isExpression;
export const getIsSlang = (state: ReducersState) => state.search.isSlang;
export const getIsAbuse = (state: ReducersState) => state.search.isAbuse;
export const getIsAbbreviation = (state: ReducersState) => state.search.isAbbreviation;
export const getTranscription = (state: ReducersState) => state.search.transcription;

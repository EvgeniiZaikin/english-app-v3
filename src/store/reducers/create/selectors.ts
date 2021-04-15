import { ReducersState } from '@store';

export const getEntity = (state: ReducersState) => state.create.entity;
export const getExistsCategory = (state: ReducersState) => state.create.existsCategory;
export const getCategory = (state: ReducersState) => state.create.category;
export const getRuValue = (state: ReducersState) => state.create.ruValue;
export const getEnValue = (state: ReducersState) => state.create.enValue;
export const getTranscription = (state: ReducersState) => state.create.transcription;
export const getIsExpression = (state: ReducersState) => state.create.isExpression;
export const getIsSlang = (state: ReducersState) => state.create.isSlang;
export const getIsAbuse = (state: ReducersState) => state.create.isAbuse;
export const getIsAbbreviation = (state: ReducersState) => state.create.isAbbreviation;
export const getListExistCategories = (state: ReducersState) => state.create.listExistCategories;

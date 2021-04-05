import { ReducersState } from '@store';

export const getFinished = (state: ReducersState) => state.repeat.finished;
export const getWord = (state: ReducersState) => state.repeat.word;
export const getEnValues = (state: ReducersState) => state.repeat.enValues;
export const getCategory = (state: ReducersState) => state.repeat.category;
export const getIsExpression = (state: ReducersState) => state.repeat.isExpression;
export const getIsSlang = (state: ReducersState) => state.repeat.isSlang;
export const getIsAbuse = (state: ReducersState) => state.repeat.isAbuse;
export const getIsAbbreviation = (state: ReducersState) => state.repeat.isAbbreviation;
export const getTranscription = (state: ReducersState) => state.repeat.transcription;
export const getRightEnValue = (state: ReducersState) => state.repeat.rightEnValue;
export const getWordId = (state: ReducersState) => state.repeat.wordId;

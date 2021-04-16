export interface IRepeatState {
  word: string;
  wordId: number | null;
  category: string;
  rightEnValue: string;
  enValues: Array<{ value: string; transcription: string | null }>;
  guessed: boolean;
  finished: boolean;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

export interface IRepeatState {
  word: string;
  wordId: number | null;
  category: string;
  rightEnValue: string;
  enValues: Array<string>;
  guessed: boolean;
  finished: boolean;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

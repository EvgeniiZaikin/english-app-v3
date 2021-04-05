export interface IGuessWord {
  wordId: number;
  ruValue: string;
  enValue: string;
  category: string | null;
  userWordId: number;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

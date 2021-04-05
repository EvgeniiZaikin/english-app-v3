export interface ISearchState {
  searchValue: string;
  ruValue: string;
  enValue: string;
  category: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

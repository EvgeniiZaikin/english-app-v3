export interface ICreateState {
  entity: 'word' | 'category';
  existsCategory: string;
  category: string;
  ruValue: string;
  enValue: string;
  transcription: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
}

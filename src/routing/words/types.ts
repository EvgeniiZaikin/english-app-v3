export interface IWord {
  word_id: number;
  word_ru_value: string;
  word_en_value: string;
  word_count_views: number;
  word_count_success_guesses: number;
}

export interface IFoundedWord {
  word_ru_value: string;
  word_en_value: string;
  category_label: string;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

export interface IGuessWord {
  wordId: number;
  ruValue: string;
  enValue: string;
  category: string | null;
  isExpression: boolean;
  isSlang: boolean;
  isAbuse: boolean;
  isAbbreviation: boolean;
  transcription: string | null;
}

import { ChangeEvent } from 'react';

export interface ICreatePageWrapperProps {
  categories: Array<string>;
}

export type ChangeInput = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

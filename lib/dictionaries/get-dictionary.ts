import { Locale } from './types';
import { ko } from './ko';
import { en } from './en';

const dictionaries = {
  ko,
  en,
};

export const getDictionary = (locale: Locale) => dictionaries[locale] || dictionaries.ko;

import { en } from './en';
import { de } from './de';

export type Language = 'en' | 'de';
export type Translation = typeof en;

export const translations: Record<Language, Translation> = {
  en,
  de
};

import { ILanguage } from '../../i18n/config';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  language: ILanguage;
}

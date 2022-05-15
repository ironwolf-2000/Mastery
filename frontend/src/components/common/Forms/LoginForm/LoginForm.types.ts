import { IUser } from '../RegisterForm/RegisterForm.types';

export type ILoginUser = Pick<IUser, 'email' | 'password'>;

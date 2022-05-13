import { IUser } from '../RegisterForm/RegisterForm.types';

export interface INavbarProps {
  user: IUser | null;
  onUserOptionsClick: () => void;
}

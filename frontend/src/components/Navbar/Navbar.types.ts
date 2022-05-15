import { IUser } from '../common/Forms/RegisterForm/RegisterForm.types';

export interface INavbarProps {
  user: IUser | null;
  onUserOptionsClick: () => void;
}

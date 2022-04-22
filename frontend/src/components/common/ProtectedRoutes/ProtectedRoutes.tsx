import { Outlet } from 'react-router-dom';
import { getCurrentUser } from '../../../services/user.service';
import { LoginForm } from '../../LoginForm';

export const ProtectedRoutes = () => {
  return getCurrentUser() ? <Outlet /> : <LoginForm />;
};

import { toast } from 'react-toastify';

import { IUser } from '../components/RegisterForm/RegisterForm.types';

export function register(user: IUser) {
  // TODO: Backend API
  const users: IUser[] = JSON.parse(localStorage.getItem('users') ?? '[]');
  if (users.some(u => u.email === user.email)) {
    toast.error('A user with this email already exists.');
  } else {
    localStorage.setItem('users', JSON.stringify([...users, user]));
    localStorage.setItem('currentUserEmail', user.email);
    toast.info('A new user has been registered.');
  }
}

export function getCurrentUser(): IUser | null {
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  if (!currentUserEmail) {
    return null;
  }

  const allUsers: IUser[] = JSON.parse(localStorage.getItem('users') ?? '[]');
  return allUsers.find(u => u.email === currentUserEmail) ?? null;
}

import { IUser } from '../components/RegisterForm/RegisterForm.types';
import { ILoginUser } from '../components/LoginForm/LoginForm.types';
import { ICRUDResponse } from './services.types';

// TODO: Replace localStorage with PostgreSQL / MySQL

function getAllUsers(): IUser[] {
  return JSON.parse(localStorage.getItem('users') ?? '[]');
}

export function getCurrentUserEmail(): string | null {
  return localStorage.getItem('currentUserEmail');
}

export function getCurrentUser(): IUser | null {
  const currentUserEmail = getCurrentUserEmail();
  if (!currentUserEmail) {
    return null;
  }

  const users = getAllUsers();
  return users.find(u => u.email === currentUserEmail) ?? null;
}

export function register(user: IUser): ICRUDResponse {
  const users = getAllUsers();
  if (users.some(u => u.email === user.email)) {
    return { success: false, message: 'A user with this email already exists.' };
  }

  localStorage.setItem('users', JSON.stringify([...users, user]));
  localStorage.setItem('currentUserEmail', user.email);
  return { success: true, message: 'A new user has been registered.' };
}

export function login(loginUser: ILoginUser): ICRUDResponse {
  const users = getAllUsers();
  const currUser = users.find(u => u.email === loginUser.email);

  if (!currUser) {
    return { success: false, message: 'A user with this email was not found.' };
  }

  if (currUser.password !== loginUser.password) {
    return { success: false, message: 'Incorrect password' };
  }

  localStorage.setItem('currentUserEmail', currUser.email);
  return { success: true, message: `Successfully logged in as ${currUser.firstName}.` };
}

export function logout() {
  localStorage.setItem('currentUserEmail', '');
}

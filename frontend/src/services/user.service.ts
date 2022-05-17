import i18n, { ILanguage } from '../i18n/config';
import { IUser } from '../components/common/Forms/RegisterForm/RegisterForm.types';
import { ILoginUser } from '../components/common/Forms/LoginForm/LoginForm.types';
import { ICRUDResponse } from './services.types';

function getAllUsers(): IUser[] {
  return JSON.parse(localStorage.getItem('users') ?? '[]');
}

export function getCurrentUserEmail(): string | null {
  return localStorage.getItem('currentUserEmail');
}

export function getCurrentUser(): IUser | null {
  const currentUserEmail = getCurrentUserEmail();
  const users = getAllUsers();
  return users.find(u => u.email === currentUserEmail) ?? null;
}

export function register(user: IUser): ICRUDResponse {
  const users = getAllUsers();
  if (users.some(u => u.email === user.email)) {
    return { success: false, message: i18n.t('A user with this email already exists.') };
  }

  localStorage.setItem('users', JSON.stringify([...users, user]));
  localStorage.setItem('currentUserEmail', user.email);
  return { success: true, message: i18n.t('A new user has been registered.') };
}

export function login(loginUser: ILoginUser): ICRUDResponse {
  const users = getAllUsers();
  const currUser = users.find(u => u.email === loginUser.email);

  if (!currUser) {
    return { success: false, message: i18n.t('A user with this email was not found.') };
  }

  if (currUser.password !== loginUser.password) {
    return { success: false, message: i18n.t('Incorrect password') };
  }

  localStorage.setItem('currentUserEmail', currUser.email);
  return {
    success: true,
    message: `${i18n.t(`Successfully logged in as`)} ${currUser.firstName}.`,
  };
}

export function logout() {
  localStorage.setItem('currentUserEmail', '');
}

export function changeCurrentUserLanguage(language: ILanguage): ICRUDResponse {
  const allUsers = getAllUsers();
  const currEmail = getCurrentUserEmail();

  let userFound = false;

  allUsers.forEach(user => {
    if (user.email === currEmail) {
      user.language = language;
      userFound = true;
    }
  });

  if (userFound) {
    localStorage.setItem('users', JSON.stringify(allUsers));
    return { success: true };
  }

  return {
    success: false,
    message: i18n.t('A user with this email was not found.'),
  };
}

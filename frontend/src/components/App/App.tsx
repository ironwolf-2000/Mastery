import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { ToastContainer } from 'react-toastify';

import { Habits, HabitsDashboard } from '../pages/HabitsPage';
import { Skills, SkillsDashboard } from '../pages/SkillsPage';
import { Preferences, PreferencesDashboard } from '../pages/PreferencesPage';
import { LandingPage } from '../pages/LandingPage';
import { LoginForm } from '../LoginForm';
import { Navbar } from '../Navbar';
import { NotFound } from '../pages/NotFoundPage';
import { RegisterForm } from '../RegisterForm';
import { UserHomePage } from '../pages/UserHomePage';
import { ProtectedRoutes } from '../common';

import { getCurrentUser } from '../../services/user.service';
import { IUser } from '../RegisterForm/RegisterForm.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const blk = cn('App');

export const App = () => {
  const location = useLocation();

  const [user, setUser] = useState<IUser | null>(null);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/' && location.pathname !== '/not-found');
  }, [location]);

  return (
    <>
      <main className={blk('', { navbarVisible })}>
        {navbarVisible && <Navbar user={user} />}
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<UserHomePage user={user} />} />

            <Route path='/habits/:encodedName' element={<HabitsDashboard />} />
            <Route path='/habits/' element={<Habits />} />
            <Route path='/skills/:encodedName' element={<SkillsDashboard />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/preferences/:encodedName' element={<PreferencesDashboard />} />
            <Route path='/preferences' element={<Preferences />} />
          </Route>

          <Route path='/' element={<LandingPage user={user} />} />
          <Route
            path='/signup'
            element={!user ? <RegisterForm /> : <Navigate to='/home' replace />}
          />
          <Route path='/login' element={!user ? <LoginForm /> : <Navigate to='/home' replace />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
      </main>
      <ToastContainer autoClose={2000} position='bottom-right' closeButton hideProgressBar />
    </>
  );
};

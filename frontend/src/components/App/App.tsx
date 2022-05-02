import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { ToastContainer } from 'react-toastify';

import { Habits } from '../pages/HabitsPage/Habits';
import { HabitsDashboard } from '../pages/HabitsPage';
import { LandingPage } from '../pages/LandingPage';
import { LoginForm } from '../LoginForm';
import { MoodDashboard } from '../pages/MoodPage';
import { Navbar } from '../Navbar';
import { NotFound } from '../pages/NotFoundPage';
import { RegisterForm } from '../RegisterForm';
import { SkillsDashboard } from '../pages/SkillsPage';
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
            <Route path='/skills' element={<SkillsDashboard />} />
            <Route path='/mood' element={<MoodDashboard />} />
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
      <ToastContainer autoClose={1500} position='bottom-right' closeButton hideProgressBar />
    </>
  );
};

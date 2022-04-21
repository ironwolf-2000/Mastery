import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { HabitsDashboard } from '../pages/HabitsPage';
import { LandingPage } from '../pages/LandingPage';
import { LoginForm } from '../LoginForm';
import { MoodDashboard } from '../pages/MoodPage';
import { Navbar } from '../Navbar';
import { NotFound } from '../pages/NotFoundPage';
import { RegisterForm } from '../RegisterForm';
import { SkillsDashboard } from '../pages/SkillsPage';
import { UserHomePage } from '../pages/UserHomePage';
import { getCurrentUser } from '../../services/user.service';
import { IUser } from '../RegisterForm/RegisterForm.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const blk = cn('App');

export const App = (props: AppProps) => {
  const location = useLocation();
  const [user, setUser] = useState<IUser | null>(null);
  let [navbarVisible, setNavbarVisible] = useState<boolean>(false);

  useEffect(() => setUser(getCurrentUser()), []);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/' && location.pathname !== '/not-found');
  }, [location]);

  return (
    <main className={blk('', { navbarVisible })}>
      {navbarVisible && <Navbar user={user} />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<UserHomePage />} />
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/habits' element={<HabitsDashboard />} />
        <Route path='/skills' element={<SkillsDashboard />} />
        <Route path='/mood' element={<MoodDashboard />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>
    </main>
  );
};

interface AppProps {}

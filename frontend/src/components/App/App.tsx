import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@bem-react/classname';

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
import { IHeatmapCellParams } from '../common/Heatmap/Heatmap.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const blk = cn('App');

export const App = () => {
  const location = useLocation();

  const [user, setUser] = useState<IUser | null>(null);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);
  const [allHeatmapState, setAllHeatmapState] = useState<IHeatmapCellParams[][]>([]);

  useEffect(() => {
    setUser(getCurrentUser());

    const all = new Array(12);
    for (let i = 0; i < 12; i++) {
      all[i] = [];
      for (let j = 0; j < 30; j++) {
        const choices = [-1, 0, 1, 4];
        all[i].push({ intensity: choices[Math.floor(Math.random() * 4)] });
      }
    }

    setAllHeatmapState(all);
  }, []);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/' && location.pathname !== '/not-found');
  }, [location]);

  return (
    <main className={blk('', { navbarVisible })}>
      {navbarVisible && <Navbar user={user} />}
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<UserHomePage user={user} />} />
          <Route path='/habits/:encodedName' element={<HabitsDashboard />} />
          <Route path='/habits/' element={<Habits overallHeatmap={allHeatmapState} />} />
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
  );
};

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

import { ProtectedRoutes } from '../common';
import { getCurrentUser } from '../../services/user.service';
import { getAllHabits } from '../../services/habits.service';
import { IUser } from '../RegisterForm/RegisterForm.types';
import { IHabitParams } from '../pages/HabitsPage/Habits.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const blk = cn('App');

export const App = () => {
  const location = useLocation();

  const [user, setUser] = useState<IUser | null>(null);
  const [habits, setHabits] = useState<IHabitParams[]>([]);

  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);

  const [currHeatmapState, setCurrHeatmapState] = useState<number[][]>([]);
  const [allHeatmapState, setAllHeatmapState] = useState<number[][]>([]);

  useEffect(() => {
    setUser(getCurrentUser());
    setHabits(getAllHabits());

    // TODO: Fetch habits data here
    const curr = new Array(10);
    for (let i = 0; i < 10; i++) {
      curr[i] = [];
      for (let j = 0; j < 10; j++) {
        curr[i].push(Math.floor(Math.random() * 6));
      }
    }

    const all = new Array(20);
    for (let i = 0; i < 12; i++) {
      all[i] = [];
      for (let j = 0; j < 30; j++) {
        all[i].push(Math.floor(Math.random() * 6));
      }
    }

    setCurrHeatmapState(curr);
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
          <Route path='/home' element={<UserHomePage />} />
          <Route
            path='/habits'
            element={
              <HabitsDashboard
                habits={habits}
                currHeatmapState={currHeatmapState}
                allHeatmapState={allHeatmapState}
              />
            }
          />
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

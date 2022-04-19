import { useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Navbar } from '../Navbar';
import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';
import { HabitsDashboard } from '../pages/HabitsPage';
import { SkillsDashboard } from '../pages/SkillsPage';
import { MoodDashboard } from '../pages/MoodPage';
import { NotFound } from '../NotFound';
import { getCurrentUser } from '../../services/user.service';
import { IUser } from '../RegisterForm/RegisterForm.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

export const App = (props: AppProps) => {
  let [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar user={user} />
        <Routes>
          <Route path='/signup' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/habits' element={<HabitsDashboard />} />
          <Route path='/skills' element={<SkillsDashboard />} />
          <Route path='/mood' element={<MoodDashboard />} />
          <Route path='/not-found' element={<NotFound />} />
          {/* <Redirect from='/' to='/home' /> */}
          {/* <Redirect to='/not-found' /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

interface AppProps {}

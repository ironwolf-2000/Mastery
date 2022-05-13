import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { toast, ToastContainer } from 'react-toastify';

import { Habits, HabitsDashboard } from '../pages/HabitsPage';
import { Skills, SkillsDashboard } from '../pages/SkillsPage';
import { Preferences, PreferencesDashboard } from '../pages/PreferencesPage';
import { LandingPage } from '../pages/LandingPage';
import { LoginForm } from '../LoginForm';
import { Navbar } from '../Navbar';
import { NotFound } from '../pages/NotFoundPage';
import { RegisterForm } from '../RegisterForm';
import { UserHomePage } from '../pages/UserHomePage';
import { ProtectedRoutes, FormModal as UserOptionsModal } from '../common';

import { changeCurrentUserLanguage, getCurrentUser } from '../../services/user.service';
import { translateEntityHeatmaps } from '../../services/heatmap.service';
import { IUser } from '../RegisterForm/RegisterForm.types';
import { DEFAULT_LANGUAGE, ILanguage } from '../../i18n/config';
import { IUserOptionsParams } from '../common/Forms/Forms.types';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const blk = cn('App');

export const LanguageContext = React.createContext<ILanguage>(DEFAULT_LANGUAGE);

export const App = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);

  const [language, setLanguage] = useState<ILanguage>(DEFAULT_LANGUAGE);

  const [userOptionsModalVisible, setUserOptionsModalVisible] = useState(false);

  const handleSaveUserOptions = ({ language }: IUserOptionsParams) => {
    const resp = changeCurrentUserLanguage(language);

    if (resp.success) {
      setTimeout(() => setLanguage(language), 500);
    } else {
      toast.error(resp.message);
    }

    setUserOptionsModalVisible(false);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
      setLanguage(user.language);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    translateEntityHeatmaps(language);
    i18n.changeLanguage(language, () => setLoading(false));
  }, [i18n, language]);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/' && location.pathname !== '/not-found');
  }, [location]);

  return !loading ? (
    <>
      <LanguageContext.Provider value={language}>
        <main className={blk('', { navbarVisible })}>
          {navbarVisible && (
            <Navbar user={user} onUserOptionsClick={() => setUserOptionsModalVisible(true)} />
          )}
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
            <Route
              path='/login'
              element={!user ? <LoginForm /> : <Navigate to='/home' replace />}
            />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/not-found' replace />} />
          </Routes>
        </main>
      </LanguageContext.Provider>
      {user && (
        <UserOptionsModal
          title={t('Options')}
          modalType='user-options'
          visible={userOptionsModalVisible}
          user={user}
          handleCancel={() => setUserOptionsModalVisible(false)}
          handleSave={handleSaveUserOptions}
        />
      )}
      <ToastContainer autoClose={2000} position='bottom-right' closeButton hideProgressBar />
    </>
  ) : null;
};

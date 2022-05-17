import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { ILanguage } from '../../../i18n/config';
import { IUser } from '../../common/Forms/RegisterForm/RegisterForm.types';
import { ImageWithFallback } from '../../common';
import { LanguageContext } from '../../App';

import './LandingPage.scss';

const habitsSrc = require('../../../assets/landing-page-habits.webp');
const habitsFallback = require('../../../assets/landing-page-habits.jpg');
const skillsSrc = require('../../../assets/landing-page-skills.webp');
const skillsFallback = require('../../../assets/landing-page-skills.jpg');
const preferencesSrc = require('../../../assets/landing-page-preferences.webp');
const preferencesFallback = require('../../../assets/landing-page-preferences.jpg');

const facebookIcon = require('../../../assets/facebook-brand.png');
const instagramIcon = require('../../../assets/instagram-brand.png');
const twitterIcon = require('../../../assets/twitter-brand.png');

const blk = cn('LandingPage');

export const LandingPage = ({ user, changeLanguage }: ILandingPageProps) => {
  const { t } = useTranslation();
  const lang = useContext(LanguageContext);

  const navigate = useNavigate();

  const entityData = [
    {
      title: t('Develop strong habits'),
      text: t('LandingPageHabitsText'),
      src: habitsSrc,
      fallbackSrc: habitsFallback,
    },
    {
      title: t('Learn new skills'),
      text: t('LandingPageSkillsText'),
      src: skillsSrc,
      fallbackSrc: skillsFallback,
    },
    {
      title: t('Track your preferences'),
      text: t('LandingPagePreferencesText'),
      src: preferencesSrc,
      fallbackSrc: preferencesFallback,
    },
  ];

  const socialMediaIcons = [
    {
      icon: facebookIcon,
      link: 'https://facebook.com',
      title: 'facebook',
    },
    {
      icon: instagramIcon,
      link: 'https://instagram.com',
      title: 'instagram',
    },
    {
      icon: twitterIcon,
      link: 'https://twitter.com',
      title: 'twitter',
    },
  ];

  return (
    <div className={blk()}>
      <header className={blk('Header')}>
        <h1 className={blk('HeaderTitle', ['display-1'])}>{t('Welcome to Mastery!')}</h1>
        <p className={blk('HeaderSubtext')}>
          {t('The place where you can become a better version of yourself.')}
        </p>
      </header>
      {entityData.map(({ title, text, src, fallbackSrc }, i) => (
        <article key={i} className={blk('Entity')}>
          <div className={blk('EntityContent', { second: i === 1 })}>
            <h2 className={blk('EntityTitle')}>{title}</h2>
            <p>{text}</p>
          </div>
          <ImageWithFallback className={blk('EntityImage')} src={src} fallbackSrc={fallbackSrc} />
        </article>
      ))}
      <div className={blk('ActionButtons')}>
        {user ? (
          <Button
            className={blk('Button')}
            type='button'
            variant='primary'
            onClick={() => navigate('/home')}
          >
            {t('To my account')}
          </Button>
        ) : (
          <>
            <Button
              className={blk('Button')}
              type='button'
              variant='info'
              onClick={() => navigate('/register')}
            >
              {t('Register')}
            </Button>
            <Button
              className={blk('Button')}
              type='button'
              variant='primary'
              onClick={() => navigate('/login')}
            >
              {t('Log in')}
            </Button>
          </>
        )}
      </div>
      <footer className={blk('Footer')}>
        <div className={blk('FooterLanguages')}>
          <img
            className={blk('LanguageIcon', { active: lang === 'en' })}
            src={require('../../../assets/lang-en.png')}
            alt='English language'
            title='English'
            onClick={() => changeLanguage('en')}
          />
          <img
            className={blk('LanguageIcon', { active: lang === 'ru' })}
            src={require('../../../assets/lang-ru.png')}
            alt='Russian language'
            title='Russian'
            onClick={() => changeLanguage('ru')}
          />
        </div>
        <div>
          <div className={blk('FooterSocialMedia')}>
            {socialMediaIcons.map(({ icon, link, title }) => {
              return (
                <a
                  className={blk('SocialMediaLink')}
                  key={title}
                  href={link}
                  target='_blank'
                  rel='noreferrer'
                >
                  <img className={blk('SocialMediaIcon')} src={icon} alt={title} />
                </a>
              );
            })}
          </div>
          <span>&copy; Mastery 2022. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

interface ILandingPageProps {
  user: IUser | null;
  changeLanguage: (language: ILanguage) => void;
}

import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faGraduationCap, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

import { IUser } from '../../RegisterForm/RegisterForm.types';

import './LandingPage.scss';

const blk = cn('LandingPage');

export const LandingPage = ({ user }: ILandingPageProps) => {
  const navigate = useNavigate();

  return (
    <div className={blk()}>
      <h1 className={blk('Heading', ['display-1'])}>Welcome to Mastery!</h1>
      <p className={blk('SecondaryText')}>
        The place where you can become a better version of yourself.
      </p>
      <div className={blk('IntroSections')}>
        <section className={blk('Section')}>
          <h2 className={blk('SectionHeading', ['h4'])}>Develop strong habits</h2>
          <FontAwesomeIcon icon={faHeartPulse} size='6x' color='var(--color-habits)' />
        </section>
        <section className={blk('Section')}>
          <h2 className={blk('SectionHeading', ['h4'])}>Learn new skills</h2>
          <FontAwesomeIcon icon={faGraduationCap} size='6x' color='var(--color-skills)' />
        </section>
        <section className={blk('Section')}>
          <h2 className={blk('SectionHeading', ['h4'])}>Track how your feel</h2>
          <FontAwesomeIcon icon={faFaceSmile} size='6x' color='var(--color-red)' />
        </section>
      </div>
      <div className={blk('RegisterSection')}>
        <Button type='button' variant='primary' size='lg' onClick={() => navigate('/signup')}>
          {user ? 'To my account' : 'Register Today'}
        </Button>
      </div>
    </div>
  );
};

interface ILandingPageProps {
  user: IUser | null;
}

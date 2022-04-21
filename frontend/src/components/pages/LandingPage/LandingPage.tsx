import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faGraduationCap, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

import './LandingPage.scss';

const blk = cn('LandingPage');

export const LandingPage = (props: LandingPageProps) => {
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
          <FontAwesomeIcon icon={faHeartPulse} size='6x' color='#06d6a0' />
        </section>
        <section className={blk('Section')}>
          <h2 className={blk('SectionHeading', ['h4'])}>Learn new skills</h2>
          <FontAwesomeIcon icon={faGraduationCap} size='6x' color='#118ab2' />
        </section>
        <section className={blk('Section')}>
          <h2 className={blk('SectionHeading', ['h4'])}>Track how your feel</h2>
          <FontAwesomeIcon icon={faFaceSmile} size='6x' color='#ef476f' />
        </section>
      </div>
      <div className={blk('RegisterSection')}>
        <Button type='button' variant='primary' size='lg' onClick={() => navigate('/signup')}>
          Register Today
        </Button>
      </div>
    </div>
  );
};

interface LandingPageProps {}

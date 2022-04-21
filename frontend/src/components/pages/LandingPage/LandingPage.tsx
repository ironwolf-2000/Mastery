import { cn } from '@bem-react/classname';

import './LandingPage.scss';

const blk = cn('LandingPage');

export const LandingPage = (props: LandingPageProps) => {
  return <div className={blk()}>LandingPage</div>;
};

interface LandingPageProps {}

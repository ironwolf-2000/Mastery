import { cn } from '@bem-react/classname';

import './UserHomePage.scss';

const blk = cn('UserHomePage');

export const UserHomePage = (props: UserHomePageProps) => {
  return <div className={blk()}>Home Page</div>;
};

interface UserHomePageProps {}

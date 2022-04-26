import { cn } from '@bem-react/classname';
import { Container } from 'react-bootstrap';

import { IUser } from '../../RegisterForm/RegisterForm.types';

import './UserHomePage.scss';

const blk = cn('UserHomePage');

export const UserHomePage = ({ user }: IUserHomePageProps) => {
  return (
    <Container className={blk()}>
      {user && (
        <span className={blk('UserLabel')}>{`${user.firstName} ${user.lastName}'s progress`}</span>
      )}
    </Container>
  );
};

interface IUserHomePageProps {
  user: IUser | null;
}

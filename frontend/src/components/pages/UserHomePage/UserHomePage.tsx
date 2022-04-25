import { cn } from '@bem-react/classname';
import { Container } from 'react-bootstrap';

import { IUser } from '../../RegisterForm/RegisterForm.types';

import './UserHomePage.scss';

const blk = cn('UserHomePage');

export const UserHomePage = ({ user }: IUserHomePageProps) => {
  return (
    <Container className={blk()}>
      <h2 className={blk('Heading', ['display-6'])}>
        Welcome back{user ? `, ${user.firstName}` : ''}!
      </h2>
    </Container>
  );
};

interface IUserHomePageProps {
  user: IUser | null;
}

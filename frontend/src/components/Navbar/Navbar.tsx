import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Dropdown, Nav, Navbar as BSNavbar } from 'react-bootstrap';

import { IUser } from '../RegisterForm/RegisterForm.types';
import { logout } from '../../services/user.service';

import './Navbar.scss';

const blk = cn('Navbar');

export const Navbar = (props: INavbarProps) => {
  const { user } = props;

  const handleLogout = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    logout();
    window.location.replace('/');
  };

  return (
    <BSNavbar bg='light' variant='light' fixed='top'>
      <Container>
        <BSNavbar.Brand className={blk('Brand')} as={Link} to='/home'>
          Mastery
        </BSNavbar.Brand>
        <Nav>
          {user && (
            <>
              <Nav.Link className={blk('NavElement')} as={Link} to='/habits'>
                Habits
              </Nav.Link>
              <Nav.Link className={blk('NavElement')} as={Link} to='/skills'>
                Skills
              </Nav.Link>
              <Nav.Link className={blk('NavElement')} as={Link} to='/mood'>
                Mood
              </Nav.Link>
            </>
          )}
          <Dropdown className={blk('Dropdown')} drop='down' align='end'>
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
            <Dropdown.Menu className={blk('DropdownMenu')}>
              {user ? (
                <>
                  <Dropdown.Item className={blk('DropdownItem')} as={Link} to='/user/options'>
                    Options
                  </Dropdown.Item>
                  <Dropdown.Divider className={blk('DropdownDivider')} />
                  <Dropdown.Item className={blk('DropdownItem')} onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item className={blk('DropdownItem')} as={Link} to='/login'>
                    Login
                  </Dropdown.Item>
                  <Dropdown.Divider className={blk('DropdownDivider')} />
                  <Dropdown.Item className={blk('DropdownItem')} as={Link} to='/signup'>
                    Register
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </BSNavbar>
  );
};

interface INavbarProps {
  user: IUser | null;
}

const CustomToggle = React.forwardRef<HTMLSpanElement, { onClick: () => void }>(
  ({ onClick }, ref) => (
    <span ref={ref} onClick={onClick}>
      <FontAwesomeIcon className={blk('UserIcon')} icon={faCircleUser} size='2x' />
    </span>
  )
);

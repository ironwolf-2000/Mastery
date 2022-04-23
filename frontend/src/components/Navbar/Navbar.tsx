import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { Link, NavLink } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Dropdown, Nav, Navbar as BSNavbar } from 'react-bootstrap';

import { DefaultModal } from '../common';
import { IUser } from '../RegisterForm/RegisterForm.types';
import { logout } from '../../services/user.service';

import './Navbar.scss';

const blk = cn('Navbar');

export const Navbar = ({ user }: INavbarProps) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    setLogoutModalVisible(false);
    setTimeout(() => window.location.replace('/'), 500);
  };

  return (
    <>
      <BSNavbar bg='light' variant='light' fixed='top' className={blk()}>
        <Container>
          <BSNavbar.Brand className={blk('Brand')} as={Link} to='/home'>
            Mastery
          </BSNavbar.Brand>
          <Nav>
            {user && (
              <>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/habits'>
                  Habits
                </Nav.Link>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/skills'>
                  Skills
                </Nav.Link>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/mood'>
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
                    <Dropdown.Item
                      className={blk('DropdownItem')}
                      onClick={e => {
                        e.preventDefault();
                        setLogoutModalVisible(true);
                      }}
                    >
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
      <DefaultModal
        visible={logoutModalVisible}
        handleCancel={() => setLogoutModalVisible(false)}
        handleConfirm={handleLogout}
        headingText='Log out?'
        bodyText='Are you sure you want to log out?'
      />
    </>
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

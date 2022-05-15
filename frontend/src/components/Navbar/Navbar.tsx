import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Link, NavLink } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Dropdown, Nav, Navbar as BSNavbar } from 'react-bootstrap';

import { DefaultModal } from '../common';
import { logout } from '../../services/user.service';
import { INavbarProps } from './Navbar.types';

import './Navbar.scss';

const blk = cn('Navbar');

export const Navbar = ({ user, onUserOptionsClick }: INavbarProps) => {
  const { t } = useTranslation();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalVisible(false);
    setTimeout(() => window.location.replace('/'), 500);
  };

  return (
    <>
      <BSNavbar bg='light' variant='light' fixed='top' className={blk()}>
        <Container>
          <BSNavbar.Brand className={blk('Brand')} as={Link} to={user ? '/home' : '/'}>
            Mastery
          </BSNavbar.Brand>
          <Nav>
            {user && (
              <>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/habits'>
                  {t('habits')}
                </Nav.Link>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/skills'>
                  {t('skills')}
                </Nav.Link>
                <Nav.Link className={blk('NavElement')} as={NavLink} to='/preferences'>
                  {t('preferences')}
                </Nav.Link>
              </>
            )}
            <Dropdown className={blk('Dropdown')} drop='down' align='end'>
              <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
              <Dropdown.Menu className={blk('DropdownMenu')}>
                {user ? (
                  <>
                    <span className={blk('UserName')}>
                      {user.firstName} {user.lastName}
                    </span>
                    <Dropdown.Item className={blk('DropdownItem')} onClick={onUserOptionsClick}>
                      {t('Options')}
                    </Dropdown.Item>
                    <Dropdown.Divider className={blk('DropdownDivider')} />
                    <Dropdown.Item
                      className={blk('DropdownItem')}
                      onClick={() => setLogoutModalVisible(true)}
                    >
                      {t('Log out')}
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item className={blk('DropdownItem')} as={Link} to='/login'>
                      {t('Log in')}
                    </Dropdown.Item>
                    <Dropdown.Divider className={blk('DropdownDivider')} />
                    <Dropdown.Item className={blk('DropdownItem')} as={Link} to='/signup'>
                      {t('Register')}
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
        title={`${t('Log out')}?`}
        bodyText={t('Are you sure you want to log out?')}
      />
    </>
  );
};

const CustomToggle = React.forwardRef<HTMLSpanElement, { onClick: () => void }>(
  ({ onClick }, ref) => (
    <span ref={ref} onClick={onClick}>
      <FontAwesomeIcon className={blk('UserIcon')} icon={faCircleUser} size='2x' />
    </span>
  )
);

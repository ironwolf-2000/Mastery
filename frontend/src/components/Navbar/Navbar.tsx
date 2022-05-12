import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Dropdown, Nav, Navbar as BSNavbar } from 'react-bootstrap';

import { DefaultModal, FormModal as UserOptionsModal } from '../common';
import { IUser } from '../RegisterForm/RegisterForm.types';
import { changeCurrentUserLanguage, logout } from '../../services/user.service';
import { IUserOptionsParams } from '../common/Forms/Forms.types';

import './Navbar.scss';

const blk = cn('Navbar');

export const Navbar = ({ user }: INavbarProps) => {
  const { i18n, t } = useTranslation();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [userOptionsModalVisible, setUserOptionsModalVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalVisible(false);
    setTimeout(() => window.location.replace('/'), 500);
  };

  const handleSaveUserOptions = ({ language }: IUserOptionsParams) => {
    const resp = changeCurrentUserLanguage(language);

    if (resp.success) {
      i18n.changeLanguage(language);
    } else {
      toast.error(resp.message);
    }

    setUserOptionsModalVisible(false);
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
                    <Dropdown.Item
                      className={blk('DropdownItem')}
                      onClick={() => setUserOptionsModalVisible(true)}
                    >
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
      {user && (
        <UserOptionsModal
          title={t('Options')}
          modalType='user-options'
          visible={userOptionsModalVisible}
          user={user}
          handleCancel={() => setUserOptionsModalVisible(false)}
          handleSave={handleSaveUserOptions}
        />
      )}
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

interface INavbarProps {
  user: IUser | null;
}

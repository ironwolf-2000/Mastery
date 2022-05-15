import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { cn } from '@bem-react/classname';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Form as BSForm } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { ILoginUser } from './LoginForm.types';
import { login } from '../../../../services/user.service';
import { MyErrorMessage } from '../ErrorMessage';

import './LoginForm.scss';

const blk = cn('LoginForm');

export const LoginForm = () => {
  const { t } = useTranslation();

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email(t('This is not a valid email.'))
      .required(t('Email address cannot be empty.')),
    password: Yup.string().required(t('Password cannot be empty.')),
  });

  const initialValues: ILoginUser = {
    email: '',
    password: '',
  };

  const handleSubmit = (user: ILoginUser) => {
    const resp = login(user);
    if (resp.success) {
      window.location.replace('/home');
    } else {
      toast.error(resp.message);
    }
  };

  return (
    <>
      <div className={blk()}>
        <h2 className={blk('Heading')}>{t('Login')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleSubmit, getFieldProps }) => {
            const isSubmitDisabled =
              Object.values(values).filter(Boolean).length < Object.keys(initialValues).length ||
              Object.keys(initialValues).some(key => key in errors);

            return (
              <BSForm className={blk('Form')} onSubmit={handleSubmit}>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>{t('Email')}</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder={t('Email address')}
                    {...getFieldProps('email')}
                  />
                  <MyErrorMessage name='email' />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>{t('Password')}</BSForm.Label>
                  <BSForm.Control
                    type='password'
                    placeholder={t('Password')}
                    {...getFieldProps('password')}
                  />
                  <MyErrorMessage name='password' />
                </BSForm.Group>
                <div className={blk('BottomSection')}>
                  <Button variant='primary' type='submit' disabled={isSubmitDisabled}>
                    {t('Log in')}
                  </Button>
                  <Link to='/signup' className={blk('SignInLabel')}>
                    {t('Register instead')} <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </div>
              </BSForm>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

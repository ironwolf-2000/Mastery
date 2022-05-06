import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { cn } from '@bem-react/classname';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Button, Form as BSForm } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { MyErrorMessage } from '../common/Forms/ErrorMessage';
import { IRegisterFormProps, IUser } from './RegisterForm.types';
import { register } from '../../services/user.service';

import './RegisterForm.scss';
import 'react-toastify/dist/ReactToastify.css';

const blk = cn('RegisterForm');

const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'First name must be 15 characters or less.')
    .required('First name cannot be empty.'),
  lastName: Yup.string()
    .max(20, 'Last name must be 20 characters or less.')
    .required('Last name cannot be empty.'),
  email: Yup.string()
    .email('This is not a valid email.')
    .required('Email address cannot be empty.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long.')
    .required('Password cannot be empty.'),
});

export const RegisterForm = (props: IRegisterFormProps) => {
  const initialValues: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleSubmit = (user: IUser) => {
    const resp = register(user);
    if (resp.success) {
      window.location.replace('/home');
    } else {
      toast.error(resp.message);
    }
  };

  return (
    <>
      <div className={blk()}>
        <h2 className={blk('Heading')}>Register a new user</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleSubmit, getFieldProps }) => {
            const isSubmitDisabled =
              Object.values(values).filter(Boolean).length < Object.keys(initialValues).length ||
              Object.keys(initialValues).some(key => key in errors);

            return (
              <BSForm className={blk('Form')} onSubmit={handleSubmit}>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>First Name</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Your first name'
                    {...getFieldProps('firstName')}
                  />
                  <MyErrorMessage name='firstName' />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Last Name</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Your last name'
                    {...getFieldProps('lastName')}
                  />
                  <MyErrorMessage name='lastName' />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Email</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Email address'
                    {...getFieldProps('email')}
                  />
                  <MyErrorMessage name='email' />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Password</BSForm.Label>
                  <BSForm.Control
                    type='password'
                    placeholder='Password'
                    {...getFieldProps('password')}
                  />
                  <small>The password must be at least 6 characters long</small>
                </BSForm.Group>
                <div className={blk('BottomSection')}>
                  <Button variant='primary' type='submit' disabled={isSubmitDisabled}>
                    Register
                  </Button>
                  <Link to='/login' className={blk('SignInLabel')}>
                    Sign in instead&nbsp;
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
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

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { cn } from '@bem-react/classname';
import { Button, Form as BSForm } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { IRegisterFormProps, IUser } from './RegisterForm.types';
import { register } from '../../services/user.service';

import './RegisterForm.scss';
import 'react-toastify/dist/ReactToastify.css';

const blk = cn('RegisterForm');

export const RegisterForm = (props: IRegisterFormProps) => {
  const initialValues: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'First name must be 15 characters or less')
      .required('First name cannot be empty'),
    lastName: Yup.string()
      .max(20, 'Last name must be 20 characters or less')
      .required('Last name cannot be empty'),
    email: Yup.string()
      .email('This is not a valid email')
      .required('Email address cannot be empty'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password cannot be empty'),
  });

  return (
    <>
      <div className={blk()}>
        <h2 className={blk('Heading')}>Register a new user</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={user => {
            register(user);
            window.location.replace('/');
          }}
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
                  <ErrorMessage
                    name='firstName'
                    render={message => <small className={blk('ErrorMessage')}>{message}</small>}
                  />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Last Name</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Your last name'
                    {...getFieldProps('lastName')}
                  />
                  <ErrorMessage
                    name='lastName'
                    render={message => <small className={blk('ErrorMessage')}>{message}</small>}
                  />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Email</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Email address'
                    {...getFieldProps('email')}
                  />
                  <ErrorMessage
                    name='email'
                    render={message => <small className={blk('ErrorMessage')}>{message}</small>}
                  />
                </BSForm.Group>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Password</BSForm.Label>
                  <BSForm.Control
                    type='password'
                    placeholder='Password'
                    {...getFieldProps('password')}
                  />
                  <small>Password must be at least 6 characters long</small>
                </BSForm.Group>
                <Button variant='primary' type='submit' disabled={isSubmitDisabled}>
                  Register
                </Button>
              </BSForm>
            );
          }}
        </Formik>
      </div>
      <ToastContainer autoClose={3000} position='bottom-right' />
    </>
  );
};

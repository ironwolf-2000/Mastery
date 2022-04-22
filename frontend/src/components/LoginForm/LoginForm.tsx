import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { cn } from '@bem-react/classname';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Form as BSForm } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { ILoginFormProps, ILoginUser } from './LoginForm.types';
import { login } from '../../services/user.service';

import './LoginForm.scss';

const blk = cn('LoginForm');

// TODO: create a reusable Form component
export const LoginForm = (props: ILoginFormProps) => {
  const initialValues: ILoginUser = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('This is not a valid email.')
      .required('Email address cannot be empty.'),
    password: Yup.string().required('Password cannot be empty.'),
  });

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
        <h2 className={blk('Heading')}>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleSubmit, getFieldProps }) => {
            const isSubmitDisabled =
              Object.values(values).filter(Boolean).length < Object.keys(initialValues).length ||
              Object.keys(initialValues).some(key => key in errors);

            return (
              <BSForm className={blk('Form')} onSubmit={handleSubmit}>
                <BSForm.Group className='mb-3'>
                  <BSForm.Label>Email address</BSForm.Label>
                  <BSForm.Control
                    type='text'
                    placeholder='Enter email'
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
                  <ErrorMessage
                    name='password'
                    render={message => <small className={blk('ErrorMessage')}>{message}</small>}
                  />
                </BSForm.Group>
                <div className={blk('BottomSection')}>
                  <Button variant='primary' type='submit' disabled={isSubmitDisabled}>
                    Login
                  </Button>
                  <Link to='/signup' className={blk('SignInLabel')}>
                    Register instead&nbsp;
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </div>
              </BSForm>
            );
          }}
        </Formik>
      </div>
      <ToastContainer autoClose={3000} position='bottom-right' />
    </>
  );
};

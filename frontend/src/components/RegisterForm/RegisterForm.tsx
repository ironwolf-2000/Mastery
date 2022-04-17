import { cn } from '@bem-react/classname';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './RegisterForm.scss';

const blk = cn('RegisterForm');

export const RegisterForm = (props: RegisterFormProps) => {
  return (
    <div className={blk()}>
      <h2>Register</h2>
      <Form className={blk('Form')}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

interface RegisterFormProps {}

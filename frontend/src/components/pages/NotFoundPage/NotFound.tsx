import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Button } from 'react-bootstrap';

import './NotFound.scss';

const blk = cn('NotFound');

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={blk()}>
      <div className={blk('ImageContainer')}>
        <img src={require('../../../assets/not-found.jpg')} alt='' className={blk('Image')} />
      </div>
      <Button
        variant='outline-secondary'
        type='button'
        onClick={() => navigate('/home', { replace: true })}
      >
        Go To Home Page
      </Button>
    </div>
  );
};

import { cn } from '@bem-react/classname';
import { Button } from 'react-bootstrap';

import './NotFound.scss';

const blk = cn('NotFound');

export const NotFound = () => {
  return (
    <div className={blk()}>
      <div className={blk('ImageContainer')}>
        <img src={require('../../../assets/not-found.jpg')} alt='' className={blk('Image')} />
      </div>
      <Button
        variant='outline-secondary'
        type='button'
        onClick={() => window.location.replace('/')}
      >
        Go To Home Page
      </Button>
    </div>
  );
};

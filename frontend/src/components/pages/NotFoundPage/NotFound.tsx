import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Button } from 'react-bootstrap';

import { ImageWithFallback } from '../../common';

import './NotFound.scss';

const error404Src = require('../../../assets/error404.webp');
const error404Fallback = require('../../../assets/error404.jpg');

const blk = cn('NotFound');

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={blk()}>
      <ImageWithFallback
        className={blk('Image')}
        src={error404Src}
        fallbackSrc={error404Fallback}
      />
      <Button
        variant='outline-secondary'
        type='button'
        onClick={() => navigate('/home', { replace: true })}
      >
        {t('Go To Home Page')}
      </Button>
    </div>
  );
};

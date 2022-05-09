import { cn } from '@bem-react/classname';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './ControlButton.scss';

const blk = cn('ControlButton');

export const ControlButton = ({ className, icon, onClick }: IControlButtonProps) => {
  return (
    <Button className={blk('', [className])} variant='outline-secondary' onClick={onClick}>
      <FontAwesomeIcon className={blk('Icon')} icon={icon} />
    </Button>
  );
};

interface IControlButtonProps {
  className?: string;
  icon: IconProp;
  onClick: () => void;
}

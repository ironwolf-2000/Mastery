import { useState, useRef } from 'react';
import { cn } from '@bem-react/classname';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Overlay, Tooltip } from 'react-bootstrap';

import './HintComponent.scss';

const blk = cn('HintComponent');

export const HintComponent = ({ tooltipMessage }: IHintComponentProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const ref = useRef(null);

  return (
    <>
      <FontAwesomeIcon
        className={blk('QuestionIcon', { active: tooltipVisible })}
        forwardedRef={ref}
        icon={faCircleQuestion}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      />
      <Overlay target={ref.current} show={tooltipVisible} placement='bottom'>
        {props => (
          <Tooltip className={blk('Tooltip')} {...props}>
            {tooltipMessage}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

interface IHintComponentProps {
  tooltipMessage: string;
}

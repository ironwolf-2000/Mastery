import { cn } from '@bem-react/classname';

import './NotFound.scss';

const blk = cn('NotFound');

export const NotFound = (props: NotFoundProps) => {
  return <div className={blk()}>Not Found</div>;
};

interface NotFoundProps {}

import { cn } from '@bem-react/classname';

import './Form.scss';

const blk = cn('Form');

export const Form = (props: FormProps) => {
  return <div className={blk()}>Form</div>;
};

interface FormProps {}

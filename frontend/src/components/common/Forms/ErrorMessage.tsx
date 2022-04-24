import { ErrorMessage } from 'formik';

export const MyErrorMessage = ({ name }: IMyErrorMessageProps) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <small style={{ color: 'var(--bs-danger)' }}>{message}</small>}
    />
  );
};

interface IMyErrorMessageProps {
  name: string;
}

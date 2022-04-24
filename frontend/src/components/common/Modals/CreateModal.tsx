import { ToastContainer } from 'react-toastify';
import { Modal } from 'react-bootstrap';

import { CreateForm } from '../Forms';
import { ICreateModalProps } from './Modals.types';

export const CreateModal = ({
  type,
  visible,
  handleCancel,
  handleCreate,
  title,
}: ICreateModalProps) => {
  return (
    <>
      <Modal show={visible} onHide={handleCancel} centered backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm type={type} handleCancel={handleCancel} handleSubmit={handleCreate} />
        </Modal.Body>
      </Modal>
      <ToastContainer autoClose={2000} position='bottom-right' />
    </>
  );
};

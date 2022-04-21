import { Button, Modal } from 'react-bootstrap';
import { IDefaultModalProps } from './Modals.types';

export const DefaultModal = ({
  visible,
  handleCancel,
  handleConfirm,
  headingText,
  bodyText,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
}: IDefaultModalProps) => {
  return (
    <Modal show={visible} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{headingText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button variant='primary' onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

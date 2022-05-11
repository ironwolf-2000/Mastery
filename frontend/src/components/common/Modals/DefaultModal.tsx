import { Button, Modal } from 'react-bootstrap';

import i18n from '../../../i18n/config';
import { IDefaultModalProps } from './Modals.types';

export const DefaultModal = ({
  visible,
  handleCancel,
  handleConfirm,
  title,
  bodyText,
  cancelLabel = i18n.t('Cancel'),
  confirmLabel = i18n.t('Confirm'),
}: IDefaultModalProps) => {
  return (
    <Modal show={visible} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
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

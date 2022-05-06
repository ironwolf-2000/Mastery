import { Modal } from 'react-bootstrap';

import { CreateForm, EditForm } from '../Forms';
import { ICreateEditModalProps, ICreateOnlyModalProps, IEditOnlyModalProps } from './Modals.types';

export const CreateEditModal = ({
  entityType,
  visible,
  title,
  handleCancel,
  ...props
}: ICreateEditModalProps) => {
  return (
    <>
      <Modal show={visible} onHide={handleCancel} centered backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCreateModalType(props) && (
            <CreateForm
              type={entityType}
              handleCancel={handleCancel}
              handleSubmit={props.handleCreate}
            />
          )}
          {isEditModalType(props) && (
            <EditForm
              type={entityType}
              entity={props.entity}
              handleCancel={handleCancel}
              handleSubmit={props.handleEdit}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

function isCreateModalType(
  props: ICreateOnlyModalProps | IEditOnlyModalProps
): props is ICreateOnlyModalProps {
  return props.modalType === 'create';
}

function isEditModalType(
  props: ICreateOnlyModalProps | IEditOnlyModalProps
): props is IEditOnlyModalProps {
  return props.modalType === 'edit';
}

import { Modal } from 'react-bootstrap';

import { CreateForm, EditForm, UserOptionsForm } from '../Forms';
import {
  ICreateEntityOnlyModalProps,
  IEditEntityOnlyModalProps,
  IFormModalProps,
  IModalPropsUnion,
  IUserOptionsOnlyModalProps,
} from './Modals.types';

export const FormModal = ({ visible, title, handleCancel, ...props }: IFormModalProps) => {
  return (
    <>
      <Modal show={visible} onHide={handleCancel} centered backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCreateModalType(props) && (
            <CreateForm
              type={props.entityType}
              handleCancel={handleCancel}
              handleSubmit={props.handleCreate}
            />
          )}
          {isEditModalType(props) && (
            <EditForm
              type={props.entityType}
              entity={props.entity}
              handleCancel={handleCancel}
              handleSubmit={props.handleEdit}
            />
          )}
          {isUserOptionsModalType(props) && (
            <UserOptionsForm
              user={props.user}
              handleCancel={handleCancel}
              handleSave={props.handleSave}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

function isCreateModalType(props: IModalPropsUnion): props is ICreateEntityOnlyModalProps {
  return props.modalType === 'create-entity';
}

function isEditModalType(props: IModalPropsUnion): props is IEditEntityOnlyModalProps {
  return props.modalType === 'edit-entity';
}

function isUserOptionsModalType(props: IModalPropsUnion): props is IUserOptionsOnlyModalProps {
  return props.modalType === 'user-options';
}

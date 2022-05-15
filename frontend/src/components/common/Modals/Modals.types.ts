import { IEntityParams, IEntityType } from '../../App/App.types';
import { IUser } from '../../common/Forms/RegisterForm/RegisterForm.types';
import { ICreateParams, IEditParams, IUserOptionsParams } from '../Forms/Forms.types';

interface IBaseModalProps {
  visible: boolean;
  title: string;
  handleCancel: () => void;
}

export interface IDefaultModalProps extends IBaseModalProps {
  bodyText: string;
  cancelLabel?: string;
  confirmLabel?: string;
  handleConfirm: () => void;
}

export interface ICreateEntityOnlyModalProps {
  modalType: 'create-entity';
  entityType: IEntityType;
  handleCreate: (params: ICreateParams) => void;
}

export interface IEditEntityOnlyModalProps {
  modalType: 'edit-entity';
  entityType: IEntityType;
  entity: IEntityParams;
  handleEdit: (params: IEditParams) => void;
}

export interface IUserOptionsOnlyModalProps {
  modalType: 'user-options';
  user: IUser;
  handleSave: (params: IUserOptionsParams) => void;
}

export type IModalPropsUnion =
  | ICreateEntityOnlyModalProps
  | IEditEntityOnlyModalProps
  | IUserOptionsOnlyModalProps;

export type IFormModalProps = IBaseModalProps & IModalPropsUnion;

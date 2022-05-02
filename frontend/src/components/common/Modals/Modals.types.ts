import { IEntityParams, IEntityType } from '../../App/App.types';
import { ICreateParams, IEditParams } from '../Forms/Forms.types';

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

export interface ICreateOnlyModalProps {
  modalType: 'create';
  handleCreate: (params: ICreateParams) => void;
}

export interface IEditOnlyModalProps {
  modalType: 'edit';
  entity: IEntityParams;
  handleEdit: (params: IEditParams) => void;
}

export type ICreateEditModalProps = IBaseModalProps & {
  entityType: IEntityType;
} & (ICreateOnlyModalProps | IEditOnlyModalProps);

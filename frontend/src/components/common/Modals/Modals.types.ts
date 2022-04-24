import { entityType } from '../../App/App.types';
import { ICreateParams } from '../Forms/Forms.types';

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

export interface ICreateModalProps extends IBaseModalProps {
  type: entityType;
  handleCreate: (params: ICreateParams) => void;
}

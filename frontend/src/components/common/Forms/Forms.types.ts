import { ILanguage } from '../../../i18n/config';
import { IEntityParams, IEntityType } from '../../App/App.types';
import { IUser } from './RegisterForm/RegisterForm.types';

export interface ICreateParams {
  type: IEntityType;
  entityName: string;
  motivationTextarea: string;
  entityFrequency: number;
  requirementsText: string;
  requirementsMinValue: number;
  successRate: number;
}

export interface IEditParams {
  name: string;
  motivation: string;
  requirementsText: string;
  requirementsMinValue: number;
}

export interface IUserOptionsParams {
  language: ILanguage;
}

export interface ICreateFormProps {
  type: IEntityType;
  handleCancel: () => void;
  handleSubmit: (params: ICreateParams) => void;
}

export interface IEditFormProps extends Pick<ICreateFormProps, 'type' | 'handleCancel'> {
  entity: IEntityParams;
  handleSubmit: (params: IEditParams) => void;
}

export interface IUserOptionsFormProps {
  user: IUser;
  handleCancel: () => void;
  handleSave: (params: IUserOptionsParams) => void;
}

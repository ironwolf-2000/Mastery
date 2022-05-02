import { IEntityParams, IEntityType } from '../../App/App.types';

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

export interface ICreateFormProps {
  type: IEntityType;
  handleCancel: () => void;
  handleSubmit: (params: ICreateParams) => void;
}

export interface IEditFormProps extends Pick<ICreateFormProps, 'type' | 'handleCancel'> {
  handleSubmit: (params: IEditParams) => void;
  entity: IEntityParams;
}

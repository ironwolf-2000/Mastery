import { IEntityType } from '../../App/App.types';

export interface ICreateParams {
  type: IEntityType;
  entityName: string;
  motivationTextarea: string;
  entityFrequency: number;
  requirementsShortDescription: string;
  requirementsUnits: number;
  successRate: number;
}

export interface ICreateFormProps {
  type: IEntityType;
  handleCancel: () => void;
  handleSubmit: (params: ICreateParams) => void;
}

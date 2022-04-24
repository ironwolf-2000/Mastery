import { entityType } from '../../App/App.types';

export interface ICreateParams {
  entityName: string;
  motivationTextarea: string;
  successRate?: number;
  type: entityType;
}

export interface ICreateFormProps {
  type: entityType;
  handleCancel: () => void;
  handleSubmit: (params: ICreateParams) => void;
}

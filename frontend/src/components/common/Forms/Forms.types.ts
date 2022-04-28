import { IEntityType } from '../../App/App.types';

export interface ICreateParams {
  entityName: string;
  motivationTextarea: string;
  masteryType: string;
  successRate: number;
  type: IEntityType;
}

export interface ICreateFormProps {
  type: IEntityType;
  handleCancel: () => void;
  handleSubmit: (params: ICreateParams) => void;
}

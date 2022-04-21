export interface IDefaultModalProps {
  visible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  headingText: string;
  bodyText: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

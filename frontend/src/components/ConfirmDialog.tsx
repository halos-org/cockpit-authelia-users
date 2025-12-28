import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@patternfly/react-core";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const buttonVariant = variant === "danger" ? "danger" : "primary";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-body"
      variant="small"
    >
      <ModalHeader title={title} titleIconVariant={variant === "danger" ? "warning" : undefined} />
      <ModalBody id="confirm-dialog-body">{message}</ModalBody>
      <ModalFooter>
        <Button
          variant={buttonVariant}
          onClick={onConfirm}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {confirmLabel}
        </Button>
        <Button variant="link" onClick={onCancel} isDisabled={isLoading}>
          {cancelLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

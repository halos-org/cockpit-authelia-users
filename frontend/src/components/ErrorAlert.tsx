import { Alert, AlertActionCloseButton, AlertActionLink } from "@patternfly/react-core";

export interface ErrorAlertProps {
  error: Error | string;
  onRetry?: () => void;
  onDismiss?: () => void;
  title?: string;
}

export function ErrorAlert({ error, onRetry, onDismiss, title = "Error" }: ErrorAlertProps) {
  const message = typeof error === "string" ? error : error.message;

  return (
    <Alert
      variant="danger"
      title={title}
      actionClose={onDismiss ? <AlertActionCloseButton onClose={onDismiss} /> : undefined}
      actionLinks={onRetry ? <AlertActionLink onClick={onRetry}>Retry</AlertActionLink> : undefined}
    >
      {message}
    </Alert>
  );
}

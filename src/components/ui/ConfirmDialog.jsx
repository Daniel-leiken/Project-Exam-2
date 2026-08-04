import { Modal } from './Modal';
import { Button } from './Button';

/**
 * Confirmation dialog for destructive or irreversible actions, built on {@link Modal}.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} props.title
 * @param {React.ReactNode} props.description
 * @param {string} [props.confirmLabel='Confirm']
 * @param {() => void} props.onConfirm
 * @param {() => void} props.onClose
 * @param {boolean} [props.loading=false] - Show a spinner on the confirm button.
 */
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  onClose,
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-neutral-700">{description}</p>
    </Modal>
  );
}

export { ConfirmDialog };

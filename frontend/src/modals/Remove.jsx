import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { close } from '../slices/modalsSlice';
import { removeChannel } from '../socketApi';

const Remove = () => {
  const { t } = useTranslation();
  const { opened, channelId } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());
  const [disabled, setDisabled] = useState(false);

  const handleRemoving = async () => {
    setDisabled(true);
    try {
      await removeChannel({ id: channelId });
      setDisabled(false);
      toast.success(t('noteRemoveChannel'));
      handleClose();
    } catch (err) {
      toast.error(t('errorDataExchange'));
      throw err;
    }
  };

  return (
    <Modal show={opened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRemoveChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalConfirmRemoving')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="danger"
            disabled={disabled}
            onClick={handleRemoving}
          >
            {t('modalRemove')}
          </Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default Remove;

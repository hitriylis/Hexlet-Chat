import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../slices/modalsSlice';
import { useSocket } from '../hooks';

const Remove = () => {
  const { t } = useTranslation();
  const { opened, channelId } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());
  const { removeChannel } = useSocket();

  const handleRemoving = async () => {
    await removeChannel({ id: channelId });
    handleClose();
  };

  return (
    <Modal show={opened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRemoveChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalConfirmRemoving')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>{t('cancel')}</Button>
          <Button variant="danger" onClick={handleRemoving}>{t('modalRemove')}</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default Remove;

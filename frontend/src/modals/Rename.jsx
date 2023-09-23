import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { close } from '../slices/modalsSlice';
import { addChannelSchema } from '../schemas';
import { useSocket } from '../hooks';

const Rename = () => {
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
  const { opened, channelId } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());
  const renamingChannel = channels.find(({ id }) => id === channelId).name;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: { channelName: renamingChannel },
    onSubmit: async ({ channelName }) => {
      await renameChannel({ id: channelId, name: channelName });
      handleClose();
    },
    validationSchema: addChannelSchema(channels, t),
  });

  return (
    <Modal show={opened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRenameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="channelName"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.channelName}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.channelName}
              ref={inputRef}
            />
            <Form.Label visuallyHidden>{t('modalChannelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>{t('cancel')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('send')}</Button>
            </div>
          </Form.Group>
        </Form>

      </Modal.Body>

    </Modal>
  );
};

export default Rename;

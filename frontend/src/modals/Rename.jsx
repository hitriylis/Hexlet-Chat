import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { close } from '../slices/modalsSlice';
import { addChannelSchema } from '../schemas';
import { renameChannel } from '../socketApi';

const Rename = () => {
  const { t } = useTranslation();
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
      try {
        await renameChannel({ id: channelId, name: channelName });
        toast.success(t('noteRenameChannel'));
        handleClose();
      } catch (err) {
        toast.error(t('errorNetwork'));
        throw (err);
      }
    },
    validationSchema: addChannelSchema(channels.map(({ name }) => name), t),
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
              id="channelName"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.channelName}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.channelName}
              ref={inputRef}
            />
            <Form.Label htmlFor="channelName" visuallyHidden>{t('modalChannelName')}</Form.Label>
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

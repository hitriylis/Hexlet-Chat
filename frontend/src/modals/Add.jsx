import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { close } from '../slices/modalsSlice';
import { useSocket } from '../hooks';
import { addChannelSchema } from '../schemas';

const Add = () => {
  const { t } = useTranslation();
  const { newChannel } = useSocket();
  const opened = useSelector((state) => state.modals.opened);
  const channels = useSelector((state) => state.channels)
    .channels
    .map(({ name }) => name);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName }) => {
      try {
        await newChannel({ name: channelName, removable: true });
        toast.success(t('noteAddChannel'));
        handleClose();
      } catch (err) {
        toast.error(t('networkError'));
        throw err;
      }
    },
    validationSchema: addChannelSchema(channels, t),
  });

  return (
    <Modal show={opened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalAddChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                name="channelName"
                className="mb-2"
                autoComplete="off"
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
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

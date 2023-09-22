import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { close } from '../slices/modalsSlice';

const Add = () => {
  const { t } = useTranslation();
  const opened = useSelector((state) => state.modals.opened);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(close());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { newChannel: '' },
    onSubmit: ({ newChannel }) => {
      console.log(newChannel);
      dispatch(close());
    },
  });

  return (
    <Modal show={opened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalAddChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="newChannel"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newChannel}
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
            <Form.Label visuallyHidden>{t('modalChannelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.newChannel}</Form.Control.Feedback>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={handleClose}>{t('cancel')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('send')}</Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

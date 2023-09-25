import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SendMessageIcon from './icons/SendMessage';
import { useAuth } from '../hooks';
import { messageSchema } from '../schemas.js';
import { newMessage } from '../socketApi';

const MessageForm = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const { currentChannelId } = useSelector((state) => state.channels);

  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: async ({ messageBody }) => {
      try {
        await newMessage({
          message: messageBody,
          channelId: currentChannelId,
          user: auth.getUsername(),
        });
        formik.resetForm();
      } catch (err) {
        toast.error(t('errorNetwork'));
      }
    },
    validationSchema: messageSchema,
  });

  const initialDisabled = formik.values.messageBody === formik.initialValues.messageBody;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <Form.Group className="input-group">
          <Form.Control
            name="messageBody"
            autoComplete="off"
            aria-label={t('newMessage')}
            placeholder={t('newMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          <Button
            type="submit"
            variant="light"
            className="border-0"
            disabled={!formik.isValid || initialDisabled}
          >
            <SendMessageIcon />
            <span className="visually-hidden">
              {t('send')}
            </span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;

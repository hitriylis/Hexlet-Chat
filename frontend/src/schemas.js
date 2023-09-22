import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(50).required(),
  password: yup.string().min(5).max(50).required(),
});

export const messageSchema = yup.object().shape({
  messageBody: yup.string().required(),
});

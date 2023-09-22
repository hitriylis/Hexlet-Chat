import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(50).required(),
  password: yup.string().min(5).max(50).required(),
});

export const messageSchema = yup.object().shape({
  messageBody: yup.string().required(),
});

export const addChannelSchema = (channels, t) => yup.object().shape({
  channelName: yup
    .string()
    .required(t('requiredField'))
    .min(3, t('requiredLength'))
    .max(20, t('requiredLength'))
    .notOneOf(channels, t('requiredUnique')),
});

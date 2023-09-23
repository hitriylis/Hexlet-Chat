import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
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

export const signupSchema = (t) => yup.object().shape({
  username: yup.string().required(t('requiredField')).min(3, t('requiredLength')).max(20, t('requiredLength')),
  password: yup.string().required(t('requiredField')).min(6, t('requiredLengthPassword')),
  confirmPassword: yup.string().oneOf([yup.ref('password')], t('mustMatch')),
});

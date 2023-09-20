import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(50).required(),
  password: yup.string().min(5).max(50).required(),
});

export default loginSchema;

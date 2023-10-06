const apiPath = 'api/v1';

export default {
  signUp: '/signup',
  login: '/login',
  chat: '/',
  notFound: '*',
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};

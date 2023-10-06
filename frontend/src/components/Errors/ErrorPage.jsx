import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

import routes from '../../routes';
import { useAuth } from '../../hooks';
import errorImg from '../../assets/error.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const handleAuthError = () => {
    navigate(routes.loginPath);
    logOut();
  };

  return (
    <div className="m-auto w-auto text-center">
      <Image width={200} height={200} alt="error image" src={errorImg} />
      <h3>{t('error')}</h3>
      {' '}
      <Button onClick={handleAuthError}>
        {t('reauthorization')}
      </Button>
    </div>
  );
};

export default ErrorPage;

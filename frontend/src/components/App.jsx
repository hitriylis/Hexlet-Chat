/* eslint-disable functional/no-expression-statements */

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import ChatPage from './ChatPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { useAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const Logout = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>{t('logout')}</Button> : null
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('mainHeader')}</Navbar.Brand>
            <Logout />
          </Container>
        </Navbar>
        <Routes>
          <Route
            index
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

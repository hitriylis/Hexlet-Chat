/* eslint-disable functional/no-expression-statements */
/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import useAuth from '../hooks';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        index
        element={(
          <PrivateRoute>
            <h1>Index Page </h1>
          </PrivateRoute>
        )}
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '.';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(user && user.token);

  const logIn = useCallback(async ({ username, password }) => {
    const { data } = await axios.post(routes.loginPath(), { username, password });
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const signup = useCallback(async ({ username, password }) => {
    const { data } = await axios.post(routes.signupPath(), { username, password });
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logOut = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }, []);

  const getAuthToken = useCallback(() => {
    if (loggedIn) {
      return user.token;
    }
    return null;
  }, [loggedIn]);

  const getUsername = useCallback(() => {
    if (loggedIn) {
      return user.username;
    }
    return null;
  }, [loggedIn]);

  const value = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthToken,
    getUsername,
    signup,
  }), [loggedIn, logIn, logOut, getAuthToken, getUsername, signup]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

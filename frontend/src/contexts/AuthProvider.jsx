/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(user && user.token);

  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }, []);

  const getAuthHeader = useCallback(() => {
    if (loggedIn) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
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
    getAuthHeader,
    getUsername,
  }), [loggedIn, logIn, logOut, getAuthHeader, getUsername]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from '.';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback(async ({ username, password }) => {
    const { data } = await axios.post(routes.loginPath(), { username, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const signup = useCallback(async ({ username, password }) => {
    const { data } = await axios.post(routes.signupPath(), { username, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const getAuthToken = useCallback(() => user.token ?? null, [user]);

  const getUsername = useCallback(() => user.username ?? null, [user]);

  const value = useMemo(() => ({
    logIn,
    logOut,
    getAuthToken,
    getUsername,
    signup,
    user,
  }), [logIn, logOut, getAuthToken, getUsername, signup, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

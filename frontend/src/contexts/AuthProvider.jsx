/* eslint-disable functional/no-expression-statements */
/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(user && user.token);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  };

  const getAuthHeader = () => {
    if (loggedIn) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const getUsername = () => {
    if (loggedIn) {
      return user.username;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
      getUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

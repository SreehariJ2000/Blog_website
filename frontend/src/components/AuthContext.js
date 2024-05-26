import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is already logged in by checking localStorage
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token); // Retrieve token from localStorage on app load
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token); // Store the token in localStorage
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token on logout
    setAuthToken(null);
  };

  const isAuthenticated = !!authToken; // true if token exists

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

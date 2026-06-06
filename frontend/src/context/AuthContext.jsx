import React, { createContext, useState, useEffect, useCallback } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  // Define logout first so it can be safely used inside useEffect below
  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
  }, []);

  // Verify stored token on app load
  useEffect(() => {
    const verifyAdmin = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setAdmin(res.data);
        } catch (error) {
          console.error('Token verification failed:', error.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAdmin();
  }, [token, logout]);

  const login = async (username, password) => {
    try {
      const res = await API.post('/auth/login', { username, password });
      const { _id, username: uname, role, token: jwt } = res.data;
      localStorage.setItem('adminToken', jwt);
      setToken(jwt);
      setAdmin({ _id, username: uname, role });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState, useEffect } from 'react';
import { getStoredUser, saveUser, clearUser, saveAccessToken, saveRefreshToken, clearTokens } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (loginData) => {
    // If loginData is an object (from API), save it directly
    // If it's a string (email - legacy), create simple user object
    if (typeof loginData === 'object' && loginData !== null) {
      // Backend login response
      const userData = {
        id: loginData.id,
        email: loginData.email,
        username: loginData.username,
        name: loginData.name || loginData.username,
        phone_number: loginData.phone_number,
        gender: loginData.gender,
        role: loginData.role,
        loginTime: new Date().toISOString()
      };
      
      // Save tokens if provided
      if (loginData.access) {
        saveAccessToken(loginData.access);
      }
      if (loginData.refresh) {
        saveRefreshToken(loginData.refresh);
      }
      
      saveUser(userData);
      setUser(userData);
      return userData;
    } else {
      // Legacy email-based login (fallback)
      const userData = {
        email: loginData,
        name: loginData.split('@')[0],
        loginTime: new Date().toISOString()
      };
      saveUser(userData);
      setUser(userData);
      return userData;
    }
  };

  const logout = () => {
    clearUser();
    clearTokens();
    setUser(null);
  };

  return { user, login, logout };
};

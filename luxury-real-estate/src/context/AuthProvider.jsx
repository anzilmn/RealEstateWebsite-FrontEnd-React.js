// src/context/AuthProvider.jsx
import { useState } from 'react';
// --- FIX: Import the context object from the OTHER file ---
import { AuthContext } from './AuthContextObject';

export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (identifier, password) => {
    let userData = null;

    // 1. Check for Hardcoded Admin
    if (identifier === 'admin' && password === 'admin') {
      userData = { 
        name: 'Admin User', 
        role: 'admin', 
        email: 'admin@luxuryestates.com' 
      };
    } 
    // 2. Check for Hardcoded Quick User
    else if (identifier === 'user' && password === 'user') {
      userData = { 
        name: 'John Doe', 
        role: 'user', 
        email: 'john@example.com' 
      };
    } 
    // 3. Check localStorage for Registered Users
    else {
      const registeredUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
      const foundUser = registeredUsers.find(
        (u) => u.email === identifier && u.password === password
      );
      
      if (foundUser) {
        userData = { 
          name: foundUser.name, 
          role: 'user', 
          email: foundUser.email 
        };
      }
    }

    // If we found a valid user, update state and storage
    if (userData) {
      setUser(userData);
      localStorage.setItem('current_user', JSON.stringify(userData));
      return userData;
    }

    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
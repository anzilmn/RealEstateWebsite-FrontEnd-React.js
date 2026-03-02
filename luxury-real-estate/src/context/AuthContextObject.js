// src/context/AuthContextObject.js
import { createContext, useContext } from 'react';

// 1. Create the Context Object
export const AuthContext = createContext(null);

// 2. Create the hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
import { useContext } from 'react';
// --- UPDATED: Use curly braces for named export ---
import { PropertyContext } from '../context/PropertyContext'; 

// This is just a function, so this file is okay for react-refresh
export const usePropertyContext = () => {
    return useContext(PropertyContext);
};
import { useContext } from 'react';
import { PropertyContext } from '../context/PropertyContextObject';

export const usePropertyContext = () => useContext(PropertyContext);
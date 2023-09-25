import { useContext } from 'react';
import { AuthContext, FilterContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useFilter = () => useContext(FilterContext);

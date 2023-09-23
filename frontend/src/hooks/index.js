import { useContext } from 'react';
import { AuthContext, SocketContext, FilterContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);

export const useFilter = () => useContext(FilterContext);

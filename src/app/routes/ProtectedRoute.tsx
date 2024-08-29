import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { getTokenFromLocalStorage } from '../../shared/lib/storage';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
}) => {
  const { currentUser, isLoading } = useAppSelector((state) => state.user);

  return currentUser === null &&
    getTokenFromLocalStorage() === '' &&
    isLoading === false ? (
    <Navigate
      to={redirectPath}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;

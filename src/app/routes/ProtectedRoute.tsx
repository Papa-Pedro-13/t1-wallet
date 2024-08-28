import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
}) => {
  const isAuthenticated = useAppSelector((state) => state.user.currentUser);

  return isAuthenticated === null ? (
    <Navigate
      to={redirectPath}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;

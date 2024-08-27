import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.currentUser
  );

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

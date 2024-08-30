import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { getTokenFromLocalStorage } from '../shared/lib/storage';
import {
  getAllUsers,
  getUser,
  logoutUser,
} from '../features/user/model/userSlice';
import Loader from './layout/Loader';

const App = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token && currentUser === null) {
        dispatch(getUser());
      } else if (!token) {
        dispatch(logoutUser());
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, navigate, currentUser]);

  useEffect(() => {
    checkAuth();
    dispatch(getAllUsers());
  }, [dispatch, checkAuth]);

  return (
    <>
      {currentUser === null && isLoading === true ? <Loader /> : <AppRouter />}
      <Toaster position='top-center' />
    </>
  );
};

export default App;

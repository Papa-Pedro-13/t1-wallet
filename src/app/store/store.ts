import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../features/user/userSlice';
import cfoSlice from '../../features/cfoList/model/cfoSlice';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { apiSlice } from '../../features/cfoDetails/model/cfoApi';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cfoList: cfoSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

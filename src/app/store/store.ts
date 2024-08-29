import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../features/user/model/userSlice';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { cfoApiSlice } from '../../features/cfoDetails/model/cfoApiSlice';
import { transactionsApiSlice } from '../../features/transactions/model/transactionsApiSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    // cfoList: cfoSlice,
    [cfoApiSlice.reducerPath]: cfoApiSlice.reducer,
    [transactionsApiSlice.reducerPath]: transactionsApiSlice.reducer,
  },
  middleware: (getMiddleware) =>
    getMiddleware()
      .concat(cfoApiSlice.middleware)
      .concat(transactionsApiSlice.middleware),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../shared/lib/storage';
import { Transaction, TransactionQueryProps } from './types';

export const transactionsApiSlice = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['transactions'],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], TransactionQueryProps>({
      query: ({ id, ...body }) => ({
        url: `/center/${id}/history`,
        method: 'POST',

        body,
      }),
    }),
  }),
});
export const { useGetTransactionsQuery } = transactionsApiSlice;

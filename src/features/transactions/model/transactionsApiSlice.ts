import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../shared/lib/storage';
import { TransactionQueryProps, TransactionResponse } from './types';
import { buildParams } from '../../../shared/api/lib/helpers';

export const transactionsApiSlice = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.4.56.90:3000/api',
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
    getTransactions: builder.query<TransactionResponse, TransactionQueryProps>({
      query: ({ id, ...body }) => ({
        url: buildParams(`/center/${id}/history`, { ...body }),
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetTransactionsQuery } = transactionsApiSlice;

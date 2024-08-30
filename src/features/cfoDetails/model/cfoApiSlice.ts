import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../shared/lib/storage';
import { CFO } from '../../cfoList/model/types';

export const cfoApiSlice = createApi({
  reducerPath: 'cfo',
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
  tagTypes: ['CFO'],
  endpoints: (builder) => ({
    getCFO: builder.query<CFO, { id: number }>({
      query: ({ id }) => ({
        url: `/center/${id}`,
        method: 'GET',
      }),
    }),
    getCFOListApi: builder.query<CFO[], void>({
      query: () => ({
        url: `/center/all`,
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetCFOQuery, useGetCFOListApiQuery } = cfoApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../app/ambient/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['CFO'],
  endpoints: (builder) => ({
    getCFO: builder.query({
      query: ({ id }) => `/center/${id}`,
    }),
    getCFOListApi: builder.query({
      query: () => `/center/all`,
    }),
  }),
});
export const { useGetCFOQuery, useGetCFOListApiQuery } = apiSlice;

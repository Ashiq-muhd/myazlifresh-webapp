import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.aslifresh.com' }), // 🔑 update if hosted elsewhere
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () => '/user/catAndSub/get',
      transformResponse: (response: { data: any[] }) => response.data, // ✅ use only data array
    }),
  }),
});

export const { useGetCategoriesQuery } = apiSlice;

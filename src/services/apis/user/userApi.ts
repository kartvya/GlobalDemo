import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiMethod, endpoint, BASE_URL } from '../../config/apiConstants';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    getProducts: build.query<any, void>({
      query: () => ({
        url: endpoint.getProducts,
        method: apiMethod.get,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetProductsQuery } = userAPI;

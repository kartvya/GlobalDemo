import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiMethod, BASE_URL, endpoint} from '../../config/apiConstants';

export const authAPI = createApi({
  reducerPath: 'authAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: builder => ({
    userLogin: builder.mutation({
      query: userDetails => ({
        url: endpoint.login,
        method: apiMethod.post,
        body: userDetails,
      }),
    }),
  }),
});

export const {useUserLoginMutation} = authAPI;

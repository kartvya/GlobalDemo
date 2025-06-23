import { NavigationContainerRef } from '@react-navigation/native';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  BaseQueryFn,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../redux/store';
import { ACTIONCONSTANTS, apiMethod, BASE_URL, endpoint } from './apiConstants';

let navigationRef: NavigationContainerRef<any> | null = null;

export const setNavigationRef = (ref: NavigationContainerRef<any>) => {
  navigationRef = ref;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { type, getState }) => {
    headers.set('Accept', 'application/json');

    if (type === 'mutation' && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const token = (getState() as RootState).root.authReducer.tokens
      .access_token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  timeout: 10000,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log('Access token expired. Attempting refresh...');

    const state = api.getState() as RootState;
    const refreshToken = state.root.authReducer.tokens.refresh_token;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '',
          method: apiMethod.post,
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        api.dispatch({
          type: ACTIONCONSTANTS.SET_IDENTITY,
          payload: refreshResult.data,
        });

        // Retry the original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.warn('Refresh failed. Logging out...');
        api.dispatch({
          type: ACTIONCONSTANTS.CLEAR_IDENTITY,
        });
      }
    } else {
      console.warn('No refresh token available. Logging out...');
    }
  }

  return result;
};

export const baseQueryWithAutoRefresh = retry(baseQueryWithReauth, {
  maxRetries: 2,
});

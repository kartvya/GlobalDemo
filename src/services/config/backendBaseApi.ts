import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAutoRefresh } from './baseQueryWithReauth';

export const TAGS = Object.freeze({
  Stands: 'Stands',
});

const TAG_TYPES: string[] = Object.values(TAGS);

const backendBaseApi = createApi({
  reducerPath: 'GlobalDemo',
  baseQuery: baseQueryWithAutoRefresh,
  endpoints: () => ({}),
  tagTypes: TAG_TYPES,
});

export const {
  util: { resetApiState: resetBackendApiState },
} = backendBaseApi;
export default backendBaseApi;

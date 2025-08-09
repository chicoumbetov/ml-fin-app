import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import type {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL });

// Create a custom baseQuery wrapper that handles retries with a long initial delay.
const retryWithWakeupDelay = async (args: any, api: any, extraOptions: any) => {
  let retries = 0;
  const maxRetries = 5;
  let lastError;

  while (retries < maxRetries) {
    const result = await baseQuery(args, api, extraOptions);
    if (result.data) {
      return result;
    }

    lastError = result.error;
    retries++;

    if (retries === 1) {
      console.warn("Server is not responding. Waiting for 2 minutes for it to wake up...");
      toast.error("Server is not responding. Waiting for 2 minutes for it to wake up...");
      await new Promise((resolve) => setTimeout(resolve, 120000));
    } else {
      const delay = Math.min(2000 * (2 ** (retries - 1)), 60000);
      console.warn(`Attempt ${retries} failed. Retrying in ${delay / 1000} seconds...`);
      toast.error(`Attempt ${retries} failed. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return { error: lastError || { status: 'FETCH_ERROR', data: 'Server is unavailable after multiple retries.' } };
};

export const api = createApi({
  baseQuery: retryWithWakeupDelay,
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
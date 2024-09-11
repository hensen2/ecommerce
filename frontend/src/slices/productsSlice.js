import { apiSlice } from "../services/apiService";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      transformResponse: (responseData) => {
        return productsAdapter.setAll(initialState, responseData.products);
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;

// returns the query result object
const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

// Creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productsAdapter.getSelectors(
    (state) => selectProductsData(state) ?? initialState
  );

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiService";
import filters from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    filters,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

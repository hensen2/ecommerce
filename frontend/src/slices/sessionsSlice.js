import { apiSlice } from "../services/apiService";

export const sessionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteSession: builder.mutation({
      query: () => ({
        url: "sessions",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteSessionMutation } = sessionsApiSlice;

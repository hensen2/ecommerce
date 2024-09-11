import { apiSlice } from "../services/apiService";

export const subscribersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation({
      query: (email) => ({
        url: "subscribers",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const { useCreateSubscriberMutation } = subscribersApiSlice;

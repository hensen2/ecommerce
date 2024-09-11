import { apiSlice } from "../services/apiService";

export const contactFormsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubmission: builder.mutation({
      query: (form) => ({
        url: "submissions",
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const { useCreateSubmissionMutation } = contactFormsApiSlice;

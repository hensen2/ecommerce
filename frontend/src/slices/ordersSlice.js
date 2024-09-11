import { apiSlice } from "../services/apiService";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  clientSecret: "",
  isSuccess: false,
  isComplete: false,
  items: [],
  transaction: {
    subtotalPrice: 0,
    shippingPrice: 3.99,
    taxPrice: 0,
    totalPrice: 0,
    taxRate: 0.0657,
  },
  customer: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    cityLocality: "",
    stateProvince: "",
    postalCode: "",
  },
  paymentMethod: {
    brand: "",
    last4: "",
    exp_month: "",
    exp_year: "",
  },
};

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (responseData) => {
        const { order, clientSecret, paymentMethod, isSuccess, isComplete } =
          responseData;
        const data = {
          ...order,
          clientSecret,
          paymentMethod,
          isSuccess,
          isComplete,
        };

        return data;
      },
      providesTags: ["Order"],
      keepUnusedDataFor: 0,
    }),
    confirmOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `orders/${orderId}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ orderId }, { dispatch, queryFulfilled }) {
        let patchResult;
        try {
          const { data: responseData } = await queryFulfilled;
          patchResult = dispatch(
            ordersApiSlice.util.updateQueryData(
              "getOrder",
              orderId,
              (draft) => {
                const { clientSecret, order, isComplete } = responseData;
                const patchData = { isComplete, clientSecret, ...order };
                Object.assign(draft, patchData);
              }
            )
          );
        } catch {
          patchResult?.undo();
        }
      },
    }),
    setupCheckout: builder.mutation({
      query: () => ({
        url: "orders",
        method: "PUT",
      }),
      transformResponse: (responseData) => responseData.orderId,
    }),
    getStripeKey: builder.query({
      query: () => "orders/config",
      transformResponse: (responseData) => responseData.stripeKey,
    }),
  }),
});

export const {
  useGetOrderQuery,
  useConfirmOrderMutation,
  useSetupCheckoutMutation,
  useGetStripeKeyQuery,
} = ordersApiSlice;

// Returns the order query result object
const selectOrderResult = (orderId) =>
  ordersApiSlice.endpoints.getOrder.select(orderId);

// Creates memoized order data selector
// Call from component as "useSelector(selectOrderData(orderId))"
export const selectOrderData = (orderId) =>
  createSelector(
    selectOrderResult(orderId),
    (orderResult) => orderResult?.data ?? initialState
  );

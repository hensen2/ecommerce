import { apiSlice } from "../services/apiService";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter({
  selectId: (item) => item.product.id,
});

const initialState = cartAdapter.getInitialState({
  totalQuantity: 0,
  subtotalPrice: 0,
});

export const cartsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "carts",
      transformResponse: (responseData) => {
        initialState.totalQuantity = responseData.cart.totalQuantity;
        initialState.subtotalPrice = responseData.cart.subtotalPrice;

        return cartAdapter.setAll(initialState, responseData.cart.items);
      },
      providesTags: ["Cart"],
      keepUnusedDataFor: 30,
    }),
    addCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `carts/items/${productId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(
        { productId, quantity, product },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          cartsApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            // Calculate new data to update cart
            const priceToAdd = product.price * quantity;
            const newSubtotalPrice = draft.subtotalPrice + priceToAdd;

            // Update cart data
            draft.subtotalPrice = Number(newSubtotalPrice.toFixed(2));
            draft.totalQuantity += quantity;

            if (draft.entities[productId]) {
              const newProductPrice =
                draft.entities[productId].totalProductPrice + priceToAdd;

              draft.entities[productId].totalProductPrice = Number(
                newProductPrice.toFixed(2)
              );
              draft.entities[productId].totalProductQuantity += quantity;
            } else {
              const { categories, name, price, mainImage, id } = product;
              draft.ids.push(productId);
              draft.entities[productId] = {
                product: {
                  categories,
                  name,
                  price,
                  mainImage,
                  id,
                },
                totalProductQuantity: quantity,
                totalProductPrice: Number(priceToAdd.toFixed(2)),
              };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `carts/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          cartsApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            // Item in cart to update
            const itemToChange = draft.entities[productId];

            // Calculate new data to update cart
            const diff = quantity - itemToChange.totalProductQuantity;
            const priceToChange = itemToChange.product.price * diff;
            const newProductPrice =
              itemToChange.totalProductPrice + priceToChange;
            const newSubtotalPrice = draft.subtotalPrice + priceToChange;

            // Update cart data
            draft.subtotalPrice = Number(newSubtotalPrice.toFixed(2));
            draft.totalQuantity += diff;

            // Update item data
            draft.entities[productId].totalProductPrice = Number(
              newProductPrice.toFixed(2)
            );
            draft.entities[productId].totalProductQuantity += diff;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeCartItem: builder.mutation({
      query: ({ productId }) => ({
        url: `carts/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartsApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            // Find item in cart to remove and extract data
            const { totalProductPrice, totalProductQuantity } =
              draft.entities[productId];

            // Calculate new data to update cart
            const newSubtotalPrice = draft.subtotalPrice - totalProductPrice;

            // Update cart data
            draft.subtotalPrice = Number(newSubtotalPrice.toFixed(2));
            draft.totalQuantity -= totalProductQuantity;

            // Remove item
            delete draft.entities[productId];
            draft.ids = draft.ids.filter((id) => id !== productId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartsApiSlice;

// Returns the cart query result object
const selectCartResult = cartsApiSlice.endpoints.getCart.select();

// Creates memoized cart data selector
// Call from component as "useSelector(selectCartData())"
const selectCartData = createSelector(
  selectCartResult,
  (cartResult) => cartResult.data
);

export const { selectAll: selectAllItems, selectById: selectItemById } =
  cartAdapter.getSelectors((state) => selectCartData(state) ?? initialState);

export const selectCartQuantity = createSelector(
  selectCartResult,
  (cartResult) => cartResult.data?.totalQuantity ?? 0
);

export const selectCartSubtotal = createSelector(
  selectCartResult,
  (cartResult) => cartResult.data?.subtotalPrice ?? 0
);

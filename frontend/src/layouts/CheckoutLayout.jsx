import { useParams } from "react-router-dom";
import { Checkout } from "../pages/index.jsx";
import { Stepper, CheckoutSummary } from "../components/index.jsx";
import { selectOrderData, useGetOrderQuery } from "../slices/ordersSlice.js";
import { useSelector } from "react-redux";

export default function CheckoutLayout() {
  // Router Hooks
  const { orderId } = useParams();

  // Redux Hooks
  const { isComplete, isSuccess, clientSecret } = useSelector(
    selectOrderData(orderId)
  );

  // Checkout API Hooks
  const { isFetching } = useGetOrderQuery(orderId);

  return (
    <div className="min-h-screen bg-white-50 font-poppins">
      {!isFetching && (
        <Stepper
          orderId={orderId}
          isComplete={isComplete}
          isSuccess={isSuccess}
          clientSecret={clientSecret}
        />
      )}

      {/* Checkout background */}
      <div
        className="fixed left-0 top-0 -z-10 hidden h-full w-1/2 lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed right-0 top-0 hidden h-full w-1/2 bg-brandPink lg:block"
        aria-hidden="true"
      />

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order Checkout</h1>
        {!isFetching && <CheckoutSummary orderId={orderId} />}
        {!isFetching && (
          <Checkout
            orderId={orderId}
            isComplete={isComplete}
            isSuccess={isSuccess}
            clientSecret={clientSecret}
          />
        )}
      </main>

    </div>
  );
}

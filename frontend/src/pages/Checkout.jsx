import {
  CheckoutInfo,
  CheckoutPayment,
  ContactSummary,
  CheckoutSuccess,
} from "../components/index.jsx";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useGetStripeKeyQuery } from "../slices/ordersSlice.js";

export default function CheckoutStepsWrapper({
  orderId,
  isComplete,
  isSuccess,
  clientSecret,
}) {
  // useState Hooks
  const [stripePromise, setStripePromise] = useState(null);

  // Checkout API Hooks
  const { data: stripeKey } = useGetStripeKeyQuery();

  // useEffect Hooks
  useEffect(() => {
    if (!stripeKey) {
      return;
    }
    setStripePromise(loadStripe(stripeKey));
  }, [stripeKey]);

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
        <div className="mx-auto max-w-lg lg:max-w-none">
          {!isComplete && stripePromise && <CheckoutInfo orderId={orderId} />}

          {!isSuccess && isComplete && stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <ContactSummary orderId={orderId} />
              <CheckoutPayment orderId={orderId} />
            </Elements>
          )}

          {isSuccess && <CheckoutSuccess orderId={orderId} />}
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../services/apiService";

export default function CheckoutPayment({ orderId }) {
  // Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();

  // useState Hooks
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redux Hooks
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin + `/checkout/${orderId}`}`,
      },
      redirect: "if_required",
    });

    if (!error) {
      dispatch(apiSlice.util.invalidateTags(["Order", "Cart"]));
    } else if (
      error.type === "card_error" ||
      error.type === "validation_error"
    ) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsProcessing(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="w-full py-14">
      <form id="payment-form" onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium text-slate lg:text-xl">
          Payment information
        </h2>
        <div className="mt-6 block border-y border-gray-200">
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
            className="inline-block w-full py-8 lg:py-6"
          />
        </div>
        {message && <p className="mt-4 font-medium text-red-500">{message}</p>}
        <div className="mt-10 sm:flex sm:items-center sm:justify-start">
          <button
            disabled={isProcessing || !stripe || !elements}
            type="submit"
            className="w-full rounded-md border border-transparent bg-brandPink px-4 py-2 text-base font-medium text-white-50 shadow-sm transition hover:bg-pink-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate disabled:pointer-events-none disabled:hover:bg-pink-300"
          >
            <span id="button-text">
              {isProcessing ? "Processing..." : "Place order"}
              {!isProcessing ? (
                <CheckCircleIcon
                  className="ml-3 inline h-6 w-6 text-white-50"
                  aria-hidden="true"
                />
              ) : (
                <svg
                  className="ml-3 inline h-6 w-6 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#3E4149"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#3E4149"
                    ></path>{" "}
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="#3E4149"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectOrderData } from "../../slices/ordersSlice";
import { useEffect } from "react";
import { useDeleteSessionMutation } from "../../slices/sessionsSlice";

export default function CheckoutSuccess({ orderId }) {
  // Redux Hooks
  const { customer, paymentMethod } = useSelector(selectOrderData(orderId));
  const [deleteSession] = useDeleteSessionMutation();

  // useEffect Hooks
  useEffect(() => {
    deleteSession();
  }, [deleteSession]);

  return (
    <>
      <div className="mx-auto max-w-2xl px-2 py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:pr-14 xl:gap-x-24">
        <div className="lg:col-span-2">
          <h1 className="text-sm font-medium text-slate">
            Success! Payment received.
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">Shipping Address</dt>
              <dd className="mt-2">
                <address className="not-italic">
                  <span className="block">{`${customer.firstName} ${customer.lastName}`}</span>
                  <span className="block">{customer.addressLine1}</span>
                  <span className="block">{customer.addressLine2}</span>
                  <span className="block">{`${customer.cityLocality}, ${customer.stateProvince} ${customer.postalCode}`}</span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Payment Information</dt>
              <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                <div className="flex-auto">
                  <p>Ending with {paymentMethod.last4}</p>
                  <p>
                    Expires {paymentMethod.exp_month} / {paymentMethod.exp_year}
                  </p>
                </div>
              </dd>
            </div>
          </dl>

          <div className="mt-14 border-t border-gray-300 py-6 text-right">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Return Home
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

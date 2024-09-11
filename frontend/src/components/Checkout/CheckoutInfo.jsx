import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  selectOrderData,
  useConfirmOrderMutation,
} from "../../slices/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../../services/apiService";
import { useState } from "react";

export default function CheckoutInfo({ orderId }) {
  // useState Hooks
  const [message, setMessage] = useState("");

  // Redux Hooks
  const dispatch = useDispatch();
  const { transaction, customer } = useSelector(selectOrderData(orderId));

  // API Hooks
  const [confirmOrder, { isLoading }] = useConfirmOrderMutation();

  // Event Handlers
  const handleCustomerChange = (e) => {
    dispatch(
      apiSlice.util.updateQueryData("getOrder", orderId, (draft) => {
        draft.customer = {
          ...draft.customer,
          [e.target.name]: e.target.value,
        };
      })
    );
  };

  const handleShippingChange = (e) => {
    dispatch(
      apiSlice.util.updateQueryData("getOrder", orderId, (draft) => {
        const newShippingPrice = Number(e.target.value);
        const newTaxPrice =
          transaction.taxRate * (newShippingPrice + transaction.subtotalPrice);
        const newTotalPrice =
          transaction.subtotalPrice + newShippingPrice + newTaxPrice;
        draft.transaction = {
          ...draft.transaction,
          shippingPrice: newShippingPrice,
          taxPrice: Number(newTaxPrice.toFixed(2)),
          totalPrice: Number(newTotalPrice.toFixed(2)),
        };
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await confirmOrder({
      orderId,
      body: {
        customer,
        shippingPrice: transaction.shippingPrice,
      },
    });

    if (result.error?.data?.message === "errorAddressValidation") {
      setMessage("Please enter a valid U.S. address and resubmit.");
    }
  };

  return (
    <div className="w-full pb-14">
      <form onSubmit={handleSubmit} id="checkout-form" autoComplete="on">
        <div className="contact-info mb-6">
          <h2 className="text-lg font-medium text-slate lg:text-xl">
            Contact information
          </h2>
          <div className="mt-6 block border-y border-gray-200">
            <div className="email inline-block w-full py-4 sm:py-6 sm:pr-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Email address"
                value={customer.email}
                onChange={handleCustomerChange}
              />
            </div>
          </div>
        </div>
        <div className="shipping-info mb-6">
          <h2 className="text-lg font-medium text-slate lg:text-xl">
            Shipping information
          </h2>
          <div className="mt-6 block border-y border-gray-200">
            <div className="firstName inline-block w-1/2 pb-1 pr-1 pt-6">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="First name"
                value={customer.firstName}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="lastName inline-block w-1/2 pb-1 pl-1 pt-6">
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Last name"
                value={customer.lastName}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="addressLine1 w-full py-1">
              <label htmlFor="addressLine1" className="sr-only">
                Address
              </label>

              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                autoComplete="address-line1"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Address"
                value={customer.addressLine1}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="addressLine2 w-full py-1">
              <label htmlFor="addressLine2" className="sr-only">
                Address2
              </label>

              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                autoComplete="address-line2"
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Apartment, suite, etc. (optional)"
                value={customer.addressLine2}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="cityLocality inline-block w-1/2 py-1 pr-1">
              <label htmlFor="cityLocality" className="sr-only">
                City
              </label>

              <input
                type="text"
                id="cityLocality"
                name="cityLocality"
                autoComplete="address-level2"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="City"
                value={customer.cityLocality}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="stateProvince inline-block w-1/2 py-1 pl-1">
              <label htmlFor="stateProvince" className="sr-only">
                State
              </label>
              <select
                id="stateProvince"
                name="stateProvince"
                autoComplete="address-level1"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                value={customer.stateProvince}
                onChange={handleCustomerChange}
              >
                <option disabled value="" hidden>
                  State
                </option>
                <option value="AL">Alabama</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="DC">Washington DC</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div className="postalCode inline-block w-1/2 pb-6 pr-1 pt-1">
              <label htmlFor="postalCode" className="sr-only">
                Zip code
              </label>

              <input
                type="text"
                id="postalCode"
                name="postalCode"
                autoComplete="postal-code"
                required
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Zip code"
                value={customer.postalCode}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="phone inline-block w-1/2 pb-6 pt-1 sm:pl-1">
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                autoComplete="tel-national"
                className="m-px w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                placeholder="Phone (optional)"
                value={customer.phone}
                onChange={handleCustomerChange}
              />
            </div>
          </div>
        </div>

        <div className="shipping-methods">
          <h2 className="text-lg font-medium text-slate lg:text-xl">
            Shipping method
          </h2>
          <div className="mt-6 block border-y border-gray-200 py-6">
            <fieldset
              onChange={handleShippingChange}
              className="w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
            >
              <legend className="sr-only">Choose a shipping method</legend>
              <div className="border-b border-gray-200 p-3">
                <span className="flex items-center justify-start">
                  <input
                    type="radio"
                    value={3.99}
                    id="ground"
                    name="shipping-method"
                    className="inline-block cursor-pointer text-black focus:ring-transparent"
                    defaultChecked={transaction.shippingPrice === 3.99}
                  />
                  <label
                    htmlFor="ground"
                    className="ml-3 flex w-full cursor-pointer items-center justify-between space-x-11"
                  >
                    <span>Ground shipping (4-8 business days)</span>
                    <span>$3.99</span>
                  </label>
                </span>
              </div>
              <div className="p-3">
                <span className="flex items-center justify-start">
                  <input
                    type="radio"
                    value={8.99}
                    id="express"
                    name="shipping-method"
                    className="inline-block cursor-pointer text-black focus:ring-transparent"
                    defaultChecked={transaction.shippingPrice === 8.99}
                  />
                  <label
                    htmlFor="express"
                    className="ml-3 flex w-full cursor-pointer items-center justify-between space-x-11"
                  >
                    <span>Express shipping (2-4 business days)</span>
                    <span>$8.99</span>
                  </label>
                </span>
              </div>
            </fieldset>
          </div>
        </div>
        {message && <p className="mt-4 font-medium text-red-500">{message}</p>}
        <div className="mt-10 sm:flex sm:items-center sm:justify-start">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-md border border-transparent bg-brandPink px-4 py-2 text-base font-medium text-white-50 shadow-sm transition hover:bg-pink-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate disabled:pointer-events-none disabled:hover:bg-pink-300"
          >
            <span id="button-text">
              {isLoading ? "Processing..." : "Confirm shipping"}
              {!isLoading ? (
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

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllItems,
  selectCartQuantity,
  selectCartSubtotal,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../slices/cartsSlice";
import { useSetupCheckoutMutation } from "../../slices/ordersSlice";
import { useState } from "react";

export default function Cart({ showModal, setShowModal }) {
  // useState Hooks
  const [isProcessing, setIsProcessing] = useState(false);

  // useSelector Hooks
  const items = useSelector(selectAllItems);
  const totalQuantity = useSelector(selectCartQuantity);
  const subtotalPrice = useSelector(selectCartSubtotal);

  // API Hooks
  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveCartItemMutation();
  const [setupCheckout] = useSetupCheckoutMutation();

  const navigate = useNavigate();

  const handleClick = async () => {
    setIsProcessing(true);

    const { data: orderId } = await setupCheckout();

    if (!orderId) {
      //error
      return;
    }

    setShowModal(false);
    setIsProcessing(false);
    navigate(`/checkout/${orderId}`);
  };

  return (
    <div
      id="cart"
      className={`pointer-events-none fixed inset-y-0 right-0 z-40 flex max-w-full before:transition-all ${
        showModal ? "animate-cart-show" : "animate-cart-hide"
      }`}
    >
      <div className="pointer-events-auto h-full w-screen max-w-md">
        <div className="flex h-full flex-col overflow-y-scroll rounded-l-[32px] bg-white-50 shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="text-lg font-medium text-slate">
                Shopping cart
              </div>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {totalQuantity === 0 ? (
              <div className="my-auto flex h-full flex-col items-center justify-center font-poppins text-slate">
                <div className="mb-3 block text-2xl">Your cart is empty...</div>
                <div className="mt-3 block text-2xl">Let&apos;s fix that!</div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((i) => (
                      <li key={i.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={i.product.mainImage}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={i.product.href}>{i.product.name}</a>
                              </h3>
                              <p className="ml-4">
                                ${i.totalProductPrice.toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {i.product.categories.type}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <label
                              htmlFor={`quantity-${i.product.id}`}
                              className="sr-only"
                            >
                              Quantity, {i.totalProductQuantity}
                            </label>
                            <select
                              id={`quantity-${i.product.id}`}
                              name={`quantity-${i.product.id}`}
                              value={i.totalProductQuantity}
                              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e) => {
                                updateItem({
                                  productId: i.product.id,
                                  quantity: e.target.value,
                                });
                              }}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-brandPink underline active:text-black"
                                onClick={() => {
                                  removeItem({
                                    productId: i.product.id,
                                  });
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {totalQuantity === 0 ? (
            <div className="border-t border-gray-200 px-4 py-12 sm:px-6">
              <div className="my-auto flex justify-center">
                <Link
                  to="/products"
                  className="flex w-[80%] items-center justify-center rounded-md border border-transparent bg-brandPink px-6 py-3 text-lg font-medium text-white-50 shadow-sm active:bg-black"
                  onClick={() => setShowModal(false)}
                >
                  Go shop!
                </Link>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  disabled={isProcessing}
                  onClick={handleClick}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-brandPink px-6 py-3 text-base font-medium text-white-50 shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate disabled:pointer-events-none disabled:hover:bg-pink-300"
                >
                  {!isProcessing ? (
                    <span>Checkout</span>
                  ) : (
                    <svg
                      className="h-6 w-6 animate-spin"
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
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-brandPink active:text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

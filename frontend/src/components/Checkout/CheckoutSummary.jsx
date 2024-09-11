import { selectOrderData } from "../../slices/ordersSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";

export default function CheckoutSummary({ orderId }) {
  // API Hooks
  const { items, transaction } = useSelector(selectOrderData(orderId));
  const [open, setOpen] = useState(window.innerWidth < 1280 ? false : true);

  const handleToggle = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      window.innerWidth < 1280 ? setOpen(false) : setOpen(true);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <>
      <section
        aria-labelledby="order-summary"
        className="bg-brandPink lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16 lg:pt-0"
      >
        <details
          open={open}
          className="w-full cursor-pointer overflow-hidden bg-brandPink px-4 lg:pointer-events-none"
          onClick={handleToggle}
          role="switch"
        >
          <summary className="mx-auto flex max-w-lg items-center justify-between py-3 lg:hidden">
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-5 w-5 shrink-0" />
              <h2 id="order-summary" className="text-md pt-1 text-slate">
                {open ? "Hide order summary" : "Show order summary"}
              </h2>
              {open ? (
                <ChevronUp className="-ml-4 h-5 w-5 shrink-0 pt-1" />
              ) : (
                <ChevronDown className="-ml-4 h-5 w-5 shrink-0 pt-1" />
              )}
            </div>

            <span className="text-md pt-1 font-medium text-slate">
              ${transaction.totalPrice?.toFixed(2)}
            </span>
          </summary>

          <h2
            id="order-summary"
            className="hidden pb-6 text-lg font-medium text-slate lg:block lg:text-xl"
          >
            Order summary
          </h2>

          <ul className="mx-auto max-w-lg divide-y divide-gray-200 pt-4 text-sm font-medium text-slate lg:pt-0">
            {items?.map((item) => (
              <li
                key={item.product.id}
                className="flex items-start space-x-4 py-6"
              >
                <img
                  src={item.product.mainImage}
                  alt=""
                  className="h-20 w-20 flex-none rounded-md object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                  <h3>{item.product.name}</h3>
                  <p className="text-gray-700">
                    {item.product.categories.type}
                  </p>
                  <p className="text-gray-700">
                    {`Qty: ${item.totalProductQuantity}`}
                  </p>
                </div>
                <p className="flex-none text-base font-medium">
                  ${item.totalProductPrice?.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mx-auto max-w-lg space-y-6 border-t border-gray-200 pb-4 pt-6 text-sm font-medium text-slate lg:pb-0">
            <div className="flex items-center justify-between">
              <dt className="text-gray-700">Subtotal</dt>
              <dd>${transaction.subtotalPrice?.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-700">Shipping</dt>
              <dd>${transaction.shippingPrice?.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-700">Taxes</dt>
              <dd>${transaction.taxPrice?.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-base">
              <dt className="font-medium text-slate">Order total</dt>
              <dd className="font-medium text-slate">
                ${transaction.totalPrice?.toFixed(2)}
              </dd>
            </div>
          </dl>
        </details>
      </section>
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { selectOrderData } from "../../slices/ordersSlice";
import { apiSlice } from "../../services/apiService";

export default function ContactSummary({ orderId }) {
  // Redux Hooks
  const { transaction, customer } = useSelector(selectOrderData(orderId));
  const dispatch = useDispatch();

  // Event Handlers
  const handleClick = () => {
    dispatch(
      apiSlice.util.updateQueryData("getOrder", orderId, (draft) => {
        draft.clientSecret = "";
        draft.isComplete = false;
      })
    );
  };

  return (
    <div className="flex w-full flex-col rounded-md border border-gray-400 font-poppins text-sm font-normal text-slate shadow-sm">
      <h2 className="sr-only">Contact Summary</h2>
      <div className="flex w-full items-center justify-between border-b border-gray-400 px-5 py-2">
        <span className="text-base font-medium">Contact Information</span>
        <button className="hover:text-pink-400" onClick={handleClick}>
          Edit
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between border-b border-gray-300 px-5 py-2">
        <span className="text-gray-600">Contact</span>
        <span className="pl-2 text-end text-gray-900">{customer.email}</span>
      </div>
      <div className="flex items-center justify-between border-b border-gray-300 px-5 py-2">
        <span className="text-gray-600">Address</span>
        <span className="pl-4 text-end text-gray-900">
          {`${customer.addressLine1}, `}
          {customer.addressLine2 && `${customer.addressLine2}, `}
          {`${customer.cityLocality}, ${customer.stateProvince} ${customer.postalCode}, U.S.`}
        </span>
      </div>
      <div className="flex items-center justify-between px-5 py-2">
        <span className="text-gray-600">Shipping</span>
        <span className="pl-4 text-end text-gray-900">
          {transaction.shippingPrice === 3.99
            ? "Ground (4-8 business days)"
            : "Express (2-4 business days)"}
        </span>
      </div>
    </div>
  );
}

import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiSlice } from "../../services/apiService";

const steps = ["Shipping", "Payment", "Success"];

export default function Stepper({
  orderId,
  isComplete,
  isSuccess,
  clientSecret,
}) {
  // useState Hooks
  const [current, setCurrent] = useState(0);

  // Redux Hooks
  const dispatch = useDispatch();

  // Event Handlers
  const handleClick = (stepIdx) => {
    dispatch(
      apiSlice.util.updateQueryData("getOrder", orderId, (draft) => {
        if (stepIdx === 0) {
          draft.clientSecret = "";
          draft.isComplete = false;
        }
      })
    );
  };

  useEffect(() => {
    if (isSuccess && isComplete) {
      setCurrent(2);
    } else if (isComplete && clientSecret) {
      setCurrent(1);
    } else {
      setCurrent(0);
    }
  }, [isSuccess, isComplete, setCurrent, clientSecret]);

  return (
    <>
      <header className="relative border-b border-gray-200 bg-white-50 text-sm font-medium text-slate">
        <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
          <div className="relative flex justify-center sm:justify-start">
            <nav className="flex" aria-label="Checkout progress">
              <ol className="flex items-center space-x-2 sm:space-x-4">
                <li>
                  <div>
                    <Link to="/" className="text-gray-400 hover:text-gray-500">
                      <HomeIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Home</span>
                    </Link>
                  </div>
                </li>
                {steps.map((step, stepIdx) => (
                  <li key={stepIdx}>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <button
                        className={`ml-1 text-sm font-medium sm:ml-4 ${
                          current === stepIdx
                            ? "text-pink-400"
                            : "text-gray-500 hover:text-gray-700"
                        } ${
                          (current === 2 || stepIdx >= current) &&
                          "pointer-events-none"
                        }`}
                        aria-current={step}
                        onClick={() => handleClick(stepIdx)}
                      >
                        {step}
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

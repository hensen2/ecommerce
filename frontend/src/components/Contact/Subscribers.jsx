import { useState } from "react";
import { useCreateSubscriberMutation } from "../../slices/subscribersSlice";

export default function Subscribers() {
  const [email, setEmail] = useState("");
  const [createSubscriber] = useCreateSubscriberMutation();

  return (
    <div className="mx-auto max-w-3xl sm:px-6 md:max-w-7xl lg:px-8">
      <div className="px-6 py-10 font-poppins text-gray-900 sm:rounded-3xl sm:bg-white-50 sm:px-12 sm:py-16 sm:shadow-xl md:flex md:items-center md:justify-between md:gap-x-24 md:px-20 md:py-20">
        <div className="md:w-0 md:flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign up for updates
          </h2>
          <p className="mt-4 max-w-xl text-lg text-gray-700">
            We will be able to notify you when new products, collections, or
            deals become available.
          </p>
        </div>
        <div className="mt-12 sm:w-full sm:max-w-md md:ml-8 md:mt-0 md:flex-1">
          <form
            className="sm:flex"
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              await createSubscriber({ email });
              setEmail("");
            }}
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="placeholder-warm-gray-500 border-white focus:ring-white w-full rounded-md bg-white-50 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brandPink"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              type="submit"
              className="focus:ring-offset-white mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-400 px-5 py-3 text-base font-medium hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0"
            >
              Notify me
            </button>
          </form>
          <p className="mt-3 text-sm text-gray-700">
            We care about the protection of your data. Read our{" "}
            <button>
              <span className="font-medium underline">Privacy Policy</span>
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

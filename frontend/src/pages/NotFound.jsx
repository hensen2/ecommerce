import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white-50">
        <div className="text-center">
          <strong className="text-9xl font-black text-gray-200">404</strong>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-brandPink px-5 py-3 text-sm font-medium text-white-50 hover:bg-brandPink focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}

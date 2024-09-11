import { Link } from "react-router-dom";

export default function Button() {
  return (
    <>
      <Link
        to="/products"
        className="hover:scale-103 inline-block rounded bg-brandPink px-8 py-3 text-sm font-medium text-white-50 transition hover:shadow-xl focus:outline-none focus:ring active:bg-brandPink"
      >
        Shop Now
      </Link>
    </>
  );
}

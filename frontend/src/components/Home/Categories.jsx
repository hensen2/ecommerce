import { Link } from "react-router-dom";

const categories = [
  {
    type: "Body Bar",
    imageSrc:
      "https://res.cloudinary.com/dxiv191qr/image/upload/v1696306286/citrus_petals_640_1_kxx5dl.png",
  },
  {
    type: "Buffing Bar",
    imageSrc:
      "https://res.cloudinary.com/dxiv191qr/image/upload/v1698698791/clean-slate-640_ax1cvo.png",
  },
  {
    type: "Soap Fluff",
    imageSrc:
      "https://res.cloudinary.com/dxiv191qr/image/upload/v1699391135/gm-soap-fluff-640_rwlsdo.png",
  },
  {
    type: "Sugar Glow",
    imageSrc:
      "https://res.cloudinary.com/dxiv191qr/image/upload/v1699391156/lc-sugar-glow-640_va5dpn.png",
  },
  {
    type: "Accessories",
    imageSrc:
      "https://res.cloudinary.com/dxiv191qr/image/upload/v1699391065/soap-bag-640_qu5lwn.png",
  },
];

export default function Categories() {
  return (
    <>
      <section
        aria-labelledby="category-heading"
        className="font-paytone lg:mx-auto lg:max-w-7xl lg:px-8"
      >
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-0">
          <h2
            id="category-heading"
            className="text-3xl font-semibold tracking-wide text-gray-900"
          >
            Shop by Category...
          </h2>
          <Link
            to="/products"
            className="hidden font-montserrat text-sm font-semibold text-gray-900 hover:text-slate sm:block"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 lg:overflow-visible">
              <div className="absolute flex space-x-8 px-4 sm:px-6 lg:relative lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0 lg:px-0">
                {categories.map((category) => (
                  <Link
                    key={category.type}
                    to={"/products"}
                    state={category.type}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg bg-white-50 p-6 hover:opacity-75 lg:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-x-0">
                      <img
                        src={category.imageSrc}
                        alt=""
                        className="h-full w-full object-contain object-top"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-gradient-to-t absolute inset-x-0 bottom-0 h-2/3 from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-semibold tracking-wide text-gray-900">
                      {category.type}
                      {category.type !== "Accessories" ? "s" : ""}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <Link
            to="/products"
            className="block font-montserrat text-sm font-semibold text-gray-900 hover:text-slate"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}

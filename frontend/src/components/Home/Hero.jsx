import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="mx-auto px-4 pb-24 xs:grid xs:grid-cols-6 xs:grid-rows-4 sm:px-6 lg:px-8"
      >
        <div className="hidden xs:col-span-2 xs:row-span-4 xs:block">
          <img
            alt="The Staples Collection"
            src="https://res.cloudinary.com/dxiv191qr/image/upload/v1699324513/hero-left_l7nlpi.png"
            className="max-w-full animate-hero-show-left"
          />
        </div>
        <div className="relative my-auto pt-6 text-center xs:col-span-2 xs:row-span-2 xs:justify-self-center">
          <svg
            role="img"
            aria-label="Sparkle Icon"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-4 animate-sparkle xs:-left-8 xs:-top-8"
          >
            <path
              d="M80 40C45.7139 43.1559 41.4122 45.7145 27.7955 80C35.1003 45.713 34.2861 43.1559 0 40C34.2861 36.8441 38.5878 34.2855 52.2045 0C44.8997 34.2855 45.7139 36.8441 80 40Z"
              fill="white"
            ></path>
          </svg>
          <svg
            role="img"
            aria-label="Sparkle Icon"
            width="60"
            height="60"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-8 right-4 animate-sparkle xs:-right-8"
          >
            <path
              d="M80 40C45.7139 43.1559 41.4122 45.7145 27.7955 80C35.1003 45.713 34.2861 43.1559 0 40C34.2861 36.8441 38.5878 34.2855 52.2045 0C44.8997 34.2855 45.7139 36.8441 80 40Z"
              fill="white"
            ></path>
          </svg>
          <h1 className="mt-20 max-w-xl font-dm_serif text-5xl font-bold uppercase tracking-wider text-white-100 xs:mt-10 xs:text-4xl sm:text-5xl md:text-6xl">
            The Staples
            <br />
            Collection
          </h1>
          <div className="mt-6 md:mt-10">
            <Link to="/products">
              <span className="inline-block rounded-md border border-transparent bg-pink-300 px-8 py-3 text-sm font-semibold text-white-100 shadow-sm hover:bg-pink-400 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300">
                Shop Collection
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden xs:col-span-2 xs:row-span-4 xs:block">
          <img
            alt="The Staples Collection"
            src="https://res.cloudinary.com/dxiv191qr/image/upload/v1699324514/hero-right_lq9jkn.png"
            className="mx-auto max-w-full animate-hero-show-right"
          />
        </div>
        <div className="mt-20 h-40 xs:col-span-2 xs:col-start-3 xs:col-end-5 xs:row-span-2 xs:mt-10 xs:h-auto md:mt-0">
          <img
            alt="The Staples Collection"
            src="https://res.cloudinary.com/dxiv191qr/image/upload/v1699324796/hero-bottom_goe9ws.png"
            className="max-w-full animate-hero-show-bottom"
          />
        </div>
      </section>
    </>
  );
}

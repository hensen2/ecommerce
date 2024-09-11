import {
  Categories,
  FeaturedProducts,
  Features,
  Hero,
  Subscribers,
} from "../components/index.jsx";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Hero />
      <FeaturedProducts />

      <div className="relative -top-24 z-[3] w-full rounded-[54px] bg-brandPurple py-24 shadow-[0_4px_67px_rgba(0,0,0,0.15)] xs:rounded-[94px] sm:py-32">
        <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/3 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
          <svg
            className="h-[45rem] w-[90rem] flex-none stroke-white-50"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                width={200}
                height={200}
                x="15%"
                y="50%"
                patternUnits="userSpaceOnUse"
                patternTransform="translate(-100 0)"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="15%" y="50%" className="overflow-visible fill-white-100">
              <path
                d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
            />
          </svg>
        </div>
        <Categories />
        <Features />
      </div>

      <Subscribers />
    </>
  );
}

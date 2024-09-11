import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  selectAllItems,
  useAddCartItemMutation,
} from "../../slices/cartsSlice";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { Popover, PopoverTrigger, PopoverContent } from "../index.jsx";

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state;
  const keyIngredients =
    product?.ingredients.length > 0
      ? product.ingredients.filter((i) => i.isKey)
      : null;

  const [keyIngredient, setKeyIngredient] = useState(
    keyIngredients
      ? {
          ingredient: keyIngredients[0],
          index: 0,
        }
      : null
  );

  const [disabled, setDisabled] = useState(false);
  const [productCounter, setCounter] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);
  const [max, setMax] = useState(8);
  const [opacity, setOpacity] = useState(1);
  const [addToCart] = useAddCartItemMutation();
  const items = useSelector(selectAllItems);

  // Event Handlers
  const handleClick = (e) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      quantity: productCounter,
      product,
    });
  };

  const handleMinusClick = () => {
    if (productCounter > 1) {
      setCounter(productCounter - 1);
    }
  };

  const handlePlusClick = () => {
    if (productCounter >= max) {
      return;
    }
    setCounter(productCounter + 1);
  };

  // useEffect Hooks
  useEffect(() => {
    const handleScrollTop = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollTop);

    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  useEffect(() => {
    let n =
      1 -
      ((window.scrollY || scrollTop) -
        document.getElementById("product").getBoundingClientRect().height /
          2.1 +
        500) /
        500;
    if (n > "1") {
      setOpacity(1);
    } else if (n < "0") {
      setOpacity(0);
    } else {
      setOpacity(n);
    }
  }, [scrollTop]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const isItemExist = items.find((item) => {
      return item.product.id === product.id;
    });

    if (isItemExist?.totalProductQuantity >= 8) {
      setDisabled(true);
      setCounter(0);
      setMax(0);
    } else if (isItemExist?.totalProductQuantity < 8) {
      setDisabled(false);
      setCounter(1);
      setMax(8 - isItemExist.totalProductQuantity);
    } else {
      setDisabled(false);
      setCounter(1);
      setMax(8);
    }
  }, [items, product.id]);

  return (
    <>
      <div className="relative w-full">
        <div
          id="product"
          className="absolute inset-0 -z-[5] bg-brandPink"
          style={{ opacity: opacity }}
        />
        <div className="mx-auto max-w-7xl xs:pt-16 sm:grid sm:grid-cols-9 sm:items-start sm:gap-x-8 sm:px-6 sm:pt-28 lg:px-8">
          <Tab.Group
            as="div"
            className="flex w-full flex-col-reverse sm:col-span-5 md:flex-row"
          >
            {/* Image selector */}
            <Tab.List className="relative box-content flex gap-x-6 gap-y-4 overflow-x-auto px-4 py-4 xxs:mx-auto xxs:overflow-visible xxs:px-0 md:flex-col md:justify-center md:py-0 md:pr-4 lg:gap-y-6">
              {product.images.map((image, index) => (
                <Tab
                  key={index}
                  className="relative flex aspect-square h-20 w-20 cursor-pointer items-center justify-center rounded-md bg-white-50 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-slate focus:ring-opacity-50 focus:ring-offset-4 md:h-24 md:w-24"
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-contain object-center"
                        />
                      </span>
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 ${
                          selected ? "ring-slate" : "ring-transparent"
                        }`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mx-auto aspect-square w-full max-w-xl">
              {product.images.map((image, index) => (
                <Tab.Panel key={index}>
                  <img
                    src={image}
                    alt=""
                    className="mx-auto object-contain object-center xs:rounded-2xl"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="ml-auto mt-16 h-full w-full px-4 font-montserrat text-gray-900 sm:col-span-4 sm:mt-0 sm:max-w-lg sm:px-0">
            <div className="h-full w-full rounded-2xl border border-gray-500 bg-white-50 px-6 py-11 shadow-lg md:px-10">
              <h2 className="w-full font-paytone text-5xl font-semibold uppercase tracking-wide">
                {product.name}
              </h2>
              <h3 className="w-full text-2xl leading-7 tracking-tight [&:not(:first-child)]:mt-6">
                {product.description}
              </h3>

              <p className="pb-6 pt-4 text-lg font-medium leading-7 tracking-wide">
                ${product.price.toFixed(2)}&nbsp; — &nbsp;
                {product.categories.type === "Accessories"
                  ? "Body Bar not included*"
                  : `${product.categories.size} oz`}
              </p>

              <form
                className="mx-auto w-full border-y-2 border-slate py-10"
                id="product-form"
              >
                <div className="mx-auto mb-4 flex w-11/12 items-center justify-between rounded-[48px] border-2 border-gray-500 bg-white-50 px-8 py-4 text-base font-medium">
                  <button
                    disabled={disabled}
                    type="button"
                    className="text-pink-300 active:text-pink-400 disabled:pointer-events-none"
                    onClick={handleMinusClick}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-pink-300">
                    {productCounter}
                  </span>
                  <button
                    disabled={disabled}
                    type="button"
                    className="text-pink-300 active:text-pink-400 disabled:pointer-events-none"
                    onClick={handlePlusClick}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  disabled={disabled}
                  type="submit"
                  className="mx-auto flex w-11/12 items-center justify-center rounded-[48px] border-2 border-gray-500 bg-brandPink px-8 py-3 tracking-wider hover:shadow-xl active:bg-pink-300 disabled:pointer-events-none disabled:opacity-50"
                  onClick={handleClick}
                >
                  <span className="text-lg font-semibold text-slate ">
                    {disabled ? "MAX 8 PER CART" : "ADD TO CART"}
                  </span>
                </button>
              </form>
              <div className="mt-8 flex items-baseline justify-between gap-1 md:justify-around">
                <div className="flex items-baseline pl-3 md:font-medium">
                  <span>
                    {product.stockRemaining > 0 ? (
                      <CheckIcon
                        className="inline h-5 w-5 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <XMarkIcon
                        className="inline h-5 w-5 flex-shrink-0 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="pl-2">
                    {product.stockRemaining > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                {product?.ingredients.length > 0 && (
                  <Popover>
                    <PopoverTrigger className="pr-3 font-normal underline decoration-2 underline-offset-4 hover:no-underline md:font-medium">
                      Ingredients List
                    </PopoverTrigger>
                    <PopoverContent>
                      {product.ingredients.map((i) => i.name).join(", ")}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-40 max-w-7xl px-4 font-montserrat text-gray-900 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <h2 className="font-puff text-6xl font-semibold uppercase tracking-wide">
              {`${
                product.categories.type === "Accessories" ? "Enhance" : "Know"
              } your soap!`}
            </h2>
            <p className="mt-6 whitespace-pre-line text-2xl leading-7 md:w-2/3 md:px-0">
              {product.details}
            </p>
          </div>
          <div className="col-span-1 mx-auto grid max-w-3xl grid-cols-2 gap-x-3 gap-y-10 sm:px-4 md:max-w-none md:grid-cols-4">
            <div className="col-span-1 flex flex-col items-center justify-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-gray-900 bg-white-50">
                <svg
                  className="h-20 w-20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-44 pt-6 text-center text-base font-normal tracking-tight">
                HEALTHY & SKIN-LOVING INGREDIENTS
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-gray-900 bg-white-50">
                <svg
                  className="h-[76px] w-[76px] pl-2"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M20 17Q20.86 17 21.45 17.6T22.03 19L14 22L7 20V11H8.95L16.22 13.69Q17 14 17 14.81 17 15.28 16.66 15.63T15.8 16H13L11.25 15.33L10.92 16.27L13 17H20M16 3.23Q17.06 2 18.7 2 20.06 2 21 3T22 5.3Q22 6.33 21 7.76T19.03 10.15 16 13Q13.92 11.11 12.94 10.15T10.97 7.76 10 5.3Q10 3.94 10.97 3T13.31 2Q14.91 2 16 3.23M.984 11H5V22H.984V11Z"
                  />
                </svg>
              </div>
              <div className="w-44 pt-6 text-center text-base font-normal tracking-tight">
                HANDCRAFTED & HOMEMADE
              </div>
            </div>

            <div className="col-span-1 flex flex-col items-center justify-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-gray-900 bg-white-50">
                <svg
                  className="h-20 w-20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M3,13A9,9 0 0,0 12,22C12,17 7.97,13 3,13M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M5.6,10.25A2.5,2.5 0 0,0 8.1,12.75C8.63,12.75 9.12,12.58 9.5,12.31C9.5,12.37 9.5,12.43 9.5,12.5A2.5,2.5 0 0,0 12,15A2.5,2.5 0 0,0 14.5,12.5C14.5,12.43 14.5,12.37 14.5,12.31C14.88,12.58 15.37,12.75 15.9,12.75C17.28,12.75 18.4,11.63 18.4,10.25C18.4,9.25 17.81,8.4 16.97,8C17.81,7.6 18.4,6.74 18.4,5.75C18.4,4.37 17.28,3.25 15.9,3.25C15.37,3.25 14.88,3.41 14.5,3.69C14.5,3.63 14.5,3.56 14.5,3.5A2.5,2.5 0 0,0 12,1A2.5,2.5 0 0,0 9.5,3.5C9.5,3.56 9.5,3.63 9.5,3.69C9.12,3.41 8.63,3.25 8.1,3.25A2.5,2.5 0 0,0 5.6,5.75C5.6,6.74 6.19,7.6 7.03,8C6.19,8.4 5.6,9.25 5.6,10.25M12,22A9,9 0 0,0 21,13C16,13 12,17 12,22Z"
                  />
                </svg>
              </div>
              <div className="w-44 pt-6 text-center text-base font-normal tracking-tight">
                NATURALLY SCENTED PRODUCTS
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-gray-900 bg-white-50">
                <svg
                  className="h-[76px] w-[76px] pr-1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z"
                  />
                </svg>
              </div>
              <div className="w-44 pt-6 text-center text-base font-normal tracking-tight">
                RICH-LATHERING & SUDSY
              </div>
            </div>
          </div>
        </div>

        {keyIngredients && (
          <div className="mx-auto mt-20 max-w-[1460px] px-4 font-montserrat text-gray-900 sm:px-6 lg:px-8">
            <div className="flex flex-wrap">
              <div className="px-6 md:px-16">
                <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-8 md:mb-12">
                  <h2 className="w-3/5 text-7xl font-medium italic tracking-tight">
                    so what&apos;s in it?
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="left-0 col-span-1 min-w-max md:pr-16">
                    <ul className="list-none overflow-hidden pb-6">
                      {keyIngredients?.map((ingredient, index) => (
                        <li key={index} className="mb-4">
                          <button
                            className={`inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-[48px] border-2 border-black px-5 py-1 shadow-inner ${
                              keyIngredient?.index === index
                                ? "pointer-events-none bg-gray-900 text-white-50"
                                : "bg-white-50 text-gray-900 hover:shadow-lg"
                            }`}
                            onClick={() =>
                              setKeyIngredient({
                                ingredient: keyIngredients[index],
                                index: index,
                              })
                            }
                          >
                            <span className="text-base font-semibold uppercase">
                              {ingredient?.name}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-1 md:col-span-3 md:ml-12 lg:ml-0">
                    <h3 className="mb-4 w-full text-4xl font-medium uppercase">
                      {keyIngredient?.ingredient?.name}
                    </h3>
                    <div className="mb-6 xxs:float-right xxs:ml-6">
                      <img
                        className="aspect-square max-w-[250px] rounded-lg border-2 border-white-50 object-cover xs:max-w-xs sm:max-w-sm lg:max-w-md"
                        src={keyIngredient?.ingredient?.image}
                        alt="ingredient"
                      />
                    </div>

                    <p className="whitespace-pre-line pr-6 text-base font-normal md:order-1 md:col-span-1 md:w-full">
                      {keyIngredient?.ingredient?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

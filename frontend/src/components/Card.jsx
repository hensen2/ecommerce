import { useSelector } from "react-redux";
import { selectItemById, useAddCartItemMutation } from "../slices/cartsSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Card({ product }) {
  // useState Hooks
  const [disabled, setDisabled] = useState(false);
  console.log(product);
  // Redux Hooks
  const item = useSelector((state) => selectItemById(state, product.id));
  const [addToCart] = useAddCartItemMutation();

  // useEffect
  useEffect(() => {
    if (item?.totalProductQuantity >= 8 || product.stockRemaining <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [item, product]);

  // Event Handlers
  const handleClick = () => {
    addToCart({
      productId: product.id,
      quantity: 1,
      product,
    });
  };

  return (
    <>
      <article className="group relative mx-auto flex max-w-sm flex-1 flex-col gap-y-3 rounded-lg font-montserrat">
        <Link to={`/product/${product.id}`} state={product}>
          <svg
            role="img"
            aria-label="Sparkle Icon"
            width="70"
            height="70"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible absolute left-6 top-4 z-10 group-hover:visible group-hover:animate-sparkle"
          >
            <path
              d="M80 40C45.7139 43.1559 41.4122 45.7145 27.7955 80C35.1003 45.713 34.2861 43.1559 0 40C34.2861 36.8441 38.5878 34.2855 52.2045 0C44.8997 34.2855 45.7139 36.8441 80 40Z"
              fill="white"
            ></path>
          </svg>
          <svg
            role="img"
            aria-label="Sparkle Icon"
            width="50"
            height="50"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible absolute bottom-[28%] right-12 z-10 group-hover:visible group-hover:animate-sparkle"
          >
            <path
              d="M80 40C45.7139 43.1559 41.4122 45.7145 27.7955 80C35.1003 45.713 34.2861 43.1559 0 40C34.2861 36.8441 38.5878 34.2855 52.2045 0C44.8997 34.2855 45.7139 36.8441 80 40Z"
              fill="white"
            ></path>
          </svg>
          <span className="sm:aspect-none aspect-square">
            <img
              className="mx-auto max-w-full transform overflow-visible object-cover object-center duration-500 group-hover:-translate-y-2"
              src={product.mainImage}
              alt=""
            />
          </span>
          <div className="flex flex-1 flex-col space-y-2 px-4 text-center">
            <h2 className="font-paytone text-xl font-bold text-gray-900">
              {product.name}
            </h2>
            <div className="font-base text-sm text-slate">
              <p className="pb-1 tracking-tight">
                {product.description} -{" "}
                <span className="font-medium tracking-normal text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className="relative flex justify-center">
          <button
            disabled={disabled}
            type="button"
            onClick={handleClick}
            className="mx-auto w-2/3 rounded-full bg-white-50 px-4 py-2.5 text-sm font-semibold tracking-wide text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-brandPink active:bg-brandPink2 disabled:pointer-events-none disabled:opacity-50"
          >
            {disabled && item?.totalProductQuantity >= 8
              ? "MAX 8 PER CART"
              : disabled && product.stockRemaining <= 0
              ? "OUT OF STOCK"
              : "ADD TO CART"}
          </button>
        </div>
      </article>
    </>
  );
}

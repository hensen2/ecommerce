import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bbLogo1 } from "../../assets";
import {
  XMarkIcon,
  Bars3Icon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Modal, Cart } from "../index.jsx";
import { useSelector } from "react-redux";
import { selectCartQuantity } from "../../slices/cartsSlice";

const navLinks = [
  {
    id: "home",
    path: "",
    title: "Home",
  },
  {
    id: "products",
    path: "products",
    title: "Shop",
  },
  {
    id: "contact",
    path: "contact",
    title: "Contact",
  },
];

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const totalQuantity = useSelector(selectCartQuantity);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal) {
        setShowModal(document.getElementById("cart").contains(e.target));
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <>
      <nav
        className={`mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 ${
          toggle && "bg-white-50"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo (md+) */}
          <div className="hidden md:flex md:flex-1 md:items-center">
            <Link to="/">
              <span className="sr-only">Beanie Bubble</span>
              <img className="w-16" src={bbLogo1} alt="logo" />
            </Link>
          </div>

          {/* Links (md+) */}
          <div className="hidden h-full md:flex md:flex-1 md:items-center md:justify-center">
            <ul className="flex h-full items-center space-x-10 font-poppins text-lg font-medium text-slate">
              {navLinks.map((nav) => {
                return (
                  <li
                    key={nav.id}
                    className="cursor-pointer hover:font-semibold hover:underline hover:decoration-2"
                  >
                    <Link to={`/${nav.path}`}>{nav.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile menu (md-) */}
          <div className="flex flex-1 items-center md:hidden">
            <button
              type="button"
              className="-ml-2 p-2 text-slate"
              onClick={() => setToggle((prev) => !prev)}
            >
              <span className="sr-only">
                {toggle ? "Close menu" : "Open menu"}
              </span>
              {toggle ? (
                <XMarkIcon className="h-6 w-6 text-slate" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-slate" />
              )}
            </button>

            <div
              className={`${
                !toggle
                  ? "hidden"
                  : "absolute right-0 top-24 my-2 flex w-full rounded-b-xl border-y border-gray-300 bg-white-50 px-4 py-2.5"
              } `}
            >
              <ul className="flex w-full flex-col justify-center font-poppins font-medium text-slate">
                {navLinks.map((nav) => {
                  return (
                    <li
                      key={nav.id}
                      className="block border-b border-gray-300 py-4 pl-3 pr-4 first:pt-2 last:border-0 last:pb-2 hover:bg-gray-50"
                      onClick={() => setToggle((prev) => !prev)}
                    >
                      <Link to={`/${nav.path}`}>
                        <button className="w-full text-left">
                          {nav.title}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Logo (md-) */}
          <Link to="/" className="md:hidden">
            <span className="sr-only">Beanie Bubble</span>
            <img src={bbLogo1} alt="logo" className="w-14" />
          </Link>

          {/* Cart */}
          <div className="flex flex-1 items-center justify-end">
            <button
              className="group -m-2 flex items-center p-2 text-slate"
              onClick={() => setShowModal(true)}
            >
              <ShoppingBagIcon
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 "
              />
              <span className="ml-2 text-sm font-medium">{totalQuantity}</span>
              <span className="sr-only">Items in cart, view bag</span>
            </button>
            {showModal ? (
              <Modal>
                <div className="visible fixed left-0 top-0 z-40 h-full w-full bg-black/[.4] opacity-100 backdrop-blur-[6px]"></div>
                <Cart
                  id="cart"
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </Modal>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}

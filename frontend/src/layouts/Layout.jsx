import { Navbar, Footer } from "../components/index.jsx";
import { Outlet } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsSlice.js";
import { useGetCartQuery } from "../slices/cartsSlice.js";

export default function Layout() {
  // API Hooks
  useGetProductsQuery(undefined, { pollingInterval: 300000 });
  useGetCartQuery();

  return (
    <>
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 -z-10 h-screen w-screen bg-brandGradient bg-cover bg-center"
      />

      <header className="relative z-10">
        <Navbar />
      </header>

      <main>
        {/* Render children */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

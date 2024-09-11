import { useState, useMemo, useEffect } from "react";
import { Card, Pagination } from "../index.jsx";

export default function ProductGallery({ filteredProducts }) {
  // useState Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(
    Math.ceil(filteredProducts.length / 6)
  );
  const [sort, setSort] = useState("featured");

  // useMemo Hooks
  const sortedProducts = useMemo(() => {
    const sortedProducts = filteredProducts.slice();
    switch (sort) {
      case "titleAsc":
        return sortedProducts.sort((a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      case "titleDesc":
        return sortedProducts.sort((a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
      case "priceAsc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  }, [filteredProducts, sort]);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 6;
    const lastPageIndex = firstPageIndex + 6;
    return sortedProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedProducts]);

  // useEffect Hooks
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setTotalPageCount(Math.ceil(filteredProducts.length / 6));
  }, [filteredProducts]);

  // Event Handlers
  const handleSortChange = (value) => {
    switch (value) {
      case "titleAsc":
        setSort("titleAsc");
        break;
      case "titleDesc":
        setSort("titleDesc");
        break;
      case "priceAsc":
        setSort("priceAsc");
        break;
      case "priceDesc":
        setSort("priceDesc");
        break;
      default:
        setSort("featured");
    }
  };

  return (
    <>
      <section
        id="product-gallery"
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl bg-white-50/60 px-4 pb-12 pt-4 shadow-sm backdrop-blur-sm sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="mb-14 flex items-center justify-between">
          <p className="self-start text-sm leading-6 text-slate">
            <span className="hidden xxs:inline"> Showing </span>
            {currentPageData.length} of {filteredProducts.length} Products
          </p>

          <div className="ml-4">
            <label htmlFor="sortBy" className="sr-only">
              {" "}
              Sort{" "}
            </label>
            <select
              id="sortBy"
              name="sortProducts"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              onBlur={(e) => handleSortChange(e.target.value)}
              className="rounded border-gray-100 text-sm text-slate focus:border-transparent focus:ring-pink-300"
            >
              <option value="featured">Featured</option>
              <option value="titleAsc">Title, A-Z</option>
              <option value="titleDesc">Title, Z-A</option>
              <option value="priceAsc">Price, Low-High</option>
              <option value="priceDesc">Price, High-Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-between gap-y-16 xs:grid-cols-2 xs:gap-x-6 lg:grid-cols-3">
          {currentPageData.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>

        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </>
  );
}

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../slices/productsSlice";
import { useState } from "react";
import { ProductFilters, ProductGallery } from "../components/index.jsx";
import { useLocation } from "react-router-dom";

export default function Soaps() {
  // Router Hooks
  const location = useLocation();
  const type = location.state;

  // useState Hooks
  const [types, setTypes] = useState(type ? [type] : []);
  const [scents, setScents] = useState([]);

  // Redux Hooks
  const products = useSelector(selectAllProducts);

  // useMemo Hooks
  // const filters = useMemo(() => {
  //   const scents = [
  //     ...new Set(products.flatMap((product) => product.categories.scent)),
  //   ];
  //   const types = [
  //     ...new Set(products.map((product) => product.categories.type)),
  //   ];
  //   return {
  //     types: types,
  //     scents: scents,
  //   };
  // }, [products]);

  const renderedProducts = useMemo(() => {
    return products.slice();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (types.length === 0 && scents.length === 0) {
      return renderedProducts.slice();
    } else if (types.length > 0 && scents.length > 0) {
      return renderedProducts
        ?.filter((product) => types.includes(product.categories.type))
        .filter((product) => {
          return (
            scents.includes(product.categories.scent[0]) ||
            scents.includes(product.categories.scent[1])
          );
        });
    } else if (types.length > 0) {
      return renderedProducts?.filter((product) =>
        types.includes(product.categories.type)
      );
    } else {
      return renderedProducts?.filter((product) => {
        return (
          scents.includes(product.categories.scent[0]) ||
          scents.includes(product.categories.scent[1])
        );
      });
    }
  }, [types, scents, renderedProducts]);

  return (
    <>
      <div className="mx-auto mt-16 max-w-[1460px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <ProductFilters
            types={types}
            scents={scents}
            setTypes={setTypes}
            setScents={setScents}
          />
          <ProductGallery filteredProducts={filteredProducts} />
        </div>
      </div>
    </>
  );
}

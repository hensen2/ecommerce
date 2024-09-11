import { Card, Button } from "../index.jsx";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../slices/productsSlice";
import { useMemo } from "react";

export default function FeaturedProducts() {
  // useSelector Hooks
  const products = useSelector(selectAllProducts);

  const featuredProducts = useMemo(() => {
    return products?.filter((product) => product.isFeatured);
  }, [products]);

  return (
    <>
      <section
        id="featured-products"
        className="relative z-[2] w-full rounded-tl-[54px] rounded-tr-[54px] bg-pink-100 shadow-[0_4px_67px_rgba(0,0,0,0.15)] xs:rounded-tl-[94px] xs:rounded-tr-[94px]"
      >
        <div className="mx-auto max-w-3xl px-4 pb-60 pt-24 text-center sm:px-6 md:max-w-5xl lg:max-w-7xl lg:px-8">
          <h2 className="mb-20 font-paytone text-4xl font-semibold text-slate">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-16 xs:grid-cols-2 md:grid-cols-3 ">
            {featuredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-20">
            <Button />
          </div>
        </div>
      </section>
    </>
  );
}

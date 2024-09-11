import { Routes, Route } from "react-router-dom";
import { CheckoutLayout, Layout } from "./layouts/index.jsx";
import { ProductDetails } from "./components/index.jsx";
import { Home, Shop, Contact, NotFound } from "./pages/index.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/checkout/:orderId" element={<CheckoutLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

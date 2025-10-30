import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Category from "@/components/pages/Category";
import ProductDetail from "@/components/pages/ProductDetail";
import CakeDesigner from "@/components/pages/CakeDesigner";
import Cart from "@/components/pages/Cart";
import Gallery from "@/components/pages/Gallery";
import CartProvider from "@/hooks/CartProvider";

function App() {
  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </CartProvider>
  );
}

export default App;
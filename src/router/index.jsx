import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";

const Home = lazy(() => import("@/components/pages/Home"));
const Category = lazy(() => import("@/components/pages/Category"));
const ProductDetail = lazy(() => import("@/components/pages/ProductDetail"));
const CakeDesigner = lazy(() => import("@/components/pages/CakeDesigner"));
const Cart = lazy(() => import("@/components/pages/Cart"));
const Gallery = lazy(() => import("@/components/pages/Gallery"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    )
  },
  {
    path: "category/:categoryName",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Category />
      </Suspense>
    )
  },
  {
    path: "product/:productId",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductDetail />
      </Suspense>
    )
  },
  {
    path: "cake-designer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CakeDesigner />
      </Suspense>
    )
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Cart />
      </Suspense>
    )
  },
  {
    path: "gallery",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Gallery />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
];

const routes = [
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-background">
        <Layout />
      </div>
    ),
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);
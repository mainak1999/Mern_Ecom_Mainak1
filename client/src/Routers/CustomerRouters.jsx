import React from "react";
import { Route, Routes, useLocation, Outlet, useRoutes } from "react-router-dom";
import HomePage from "../customer/pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import PaymentSuccess from "../customer/components/payment/PaymentSuccess";
import LoginForm from "../customer/Auth/LoginForm";
import RegisterForm from "../customer/Auth/RegisterForm";

const CustomerRouters = () => {
  const location = useLocation();

  // Define an array of routes where you want to show the navigation
  const routesWithNavigation = ["/", "/home", "/cart", "/account/order", "/checkout", "/payment/:orderId"];

  const showNavigation = routesWithNavigation.some(route => location.pathname.includes(route));

  return (
    <div>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/:lavelOne/:lavelTwo/:lavelThree"
          element={<Product />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />}/>
        {/* Add other routes here as needed */}
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRouters;

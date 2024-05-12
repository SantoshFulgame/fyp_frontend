import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./component/Footer/Footer";
import Home from "./page/Home";
import Menu from "./page/Menu";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/login";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import Cart from "./page/Cart";
// import Success from "./page/Success";
import Dashboard from "./page/Dashboard";
import Cancel from "./page/Cancel";
import Inventory from "./page/Inventory";
import Customers from "./page/Customers";
import CustomersOrders from "./page/CustomersOrders";
import ProtectedRoutes from "./component/ProtectedRoutes";
import { loginRedux } from "./redux/userSlice"; // Import loginRedux action
import OrderHistory from "./page/OrderHistory";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();
  }, []);

  // Check if user data is stored in localStorage and dispatch loginRedux action to set user data in Redux state
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(loginRedux({ data: JSON.parse(userData) }));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Routes>
            <Route path="/" element={<ProtectedRoutes element={<Home />} />} />
            <Route path="menu" element={<ProtectedRoutes element={<Menu />} />} />
            <Route path="menu/:filterby" element={<ProtectedRoutes element={<Menu />} />} />
            <Route path="about" element={<ProtectedRoutes element={<About />} />} />
            <Route path="contact" element={<ProtectedRoutes element={<Contact />} />} />
            <Route path="newproduct" element={<ProtectedRoutes element={<Newproduct />} />} />
            <Route path="cart" element={<ProtectedRoutes element={<Cart />} />} />
            <Route path="dashboard" element={<ProtectedRoutes element={<Dashboard />} />} />
            <Route path="inventory" element={<ProtectedRoutes element={<Inventory />} />} />
            <Route path="customers" element={<ProtectedRoutes element={<Customers />} />} />
            <Route path="customerorders" element={<ProtectedRoutes element={<CustomersOrders />} />} />
            <Route path="myorders" element={<ProtectedRoutes element={<OrderHistory />} />} />
            <Route path="cancel" element={<ProtectedRoutes element={<Cancel />} />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

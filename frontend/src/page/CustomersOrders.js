import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import emptyOrdersImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomersOrders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Fetch orders error:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-slate-600 mb-4">Customer Orders</h2>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="flex flex-col md:flex-row items-start bg-white shadow-md mb-4 w-full md:w-1/2">
            <div className="flex-shrink-0 w-48 md:w-32 p-4">
              <img src={order.productImage} alt={order.productName} className="w-full h-auto object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <p className="text-sm text-slate-500">Order ID: <span className="font-semibold">{order._id}</span></p>
                <p className="text-sm text-slate-500">User ID: <span className="font-semibold">{order.userId}</span></p>
                <p className="text-sm text-slate-500">User Email: <span className="font-semibold">{order.email}</span></p>
                <p className="text-sm text-slate-500">Amount paid: <span className="font-semibold text-red-500">₹{order.price}</span></p>
                <p className="text-sm text-slate-500">Order Date: <span className="font-semibold">{new Date(order.orderDate).toLocaleDateString()}</span></p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center">
          <img src={emptyOrdersImage} alt="Empty orders" className="w-64 mb-4" />
          <p className="text-xl font-semibold text-slate-500">No Customer Orders Found</p>
        </div>
      )}
    </div>
  );
};

export default CustomersOrders;

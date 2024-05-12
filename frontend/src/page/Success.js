import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Removed useDispatch
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/api/orders/user/${user._id}`);

        if (Array.isArray(response.data)) {
          const ordersWithProducts = await Promise.all(response.data.map(async (order) => {
            if (order.products && Array.isArray(order.products)) {
              const productsWithDetails = await Promise.all(order.products.map(async (product) => {
                try {
                  const productResponse = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/api/product/${product.product_id}`);
                  return productResponse.data;
                } catch (error) {
                  console.error("Error fetching product details:", error);
                  return null;
                }
              }));
              return { ...order, products: productsWithDetails };
            } else {
              console.error("Products data is missing or not an array in order:", order);
              // Handle the case where products data is missing or not an array
              // For example, you can return the order without modifying it
              return order;
            }
          }));

          setOrders(ordersWithProducts);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user && user._id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h2>Your Order History</h2>
      <div>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Qty: {order.quantity}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              {/* Display product information */}
              {order.products && Array.isArray(order.products) && order.products.map((product, index) => (
                <div key={index}>
                  <p>Product Name: {product.name}</p>
                  <p>Category: {product.category}</p>
                  <img src={product.image} alt={product.name} />
                  {/* Add more product details as needed */}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

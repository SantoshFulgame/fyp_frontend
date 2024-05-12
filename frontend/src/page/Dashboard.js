import React, { useEffect, useState } from "react";
import { Typography, Card, Space, Statistic } from "antd";
import { ShoppingCartOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const productResponse = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const orderResponse = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/orders`);
      // Calculate total revenue from orders
      const totalRevenue = orderResponse.data.reduce((acc, order) => acc + order.price, 0);
      const customerResponse = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/customers`);

      setTotalProducts(productResponse.data.length);
      setTotalOrders(orderResponse.data.length);
      setTotalRevenue(totalRevenue);
      setTotalCustomers(customerResponse.data.length);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-4">
      <Typography.Title level={4} className="mb-4 text-center">Dashboard</Typography.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <DashboardCard
          icon={<ShoppingCartOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Orders"}
          value={totalOrders}
        />
        <DashboardCard
          icon={<ShoppingCartOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Total Products"}
          value={totalProducts}
        />
        <DashboardCard
          icon={<DollarOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Total Revenue"}
          value={totalRevenue}
        />
        <DashboardCard
          icon={<UserOutlined style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Total Customers"}
          value={totalCustomers}
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;

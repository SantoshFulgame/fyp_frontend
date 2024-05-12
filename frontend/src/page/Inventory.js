import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      .then((res) => {
        setDataSource(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <span>₹ {price}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
  ];

  return (
    <Space className="flex flex-col items-center" size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <div className="w-full max-w-screen-lg">
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          className="w-full"
        />
      </div>
    </Space>
  );
}

export default Inventory;

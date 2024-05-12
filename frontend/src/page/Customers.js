import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/customers`)
      .then((res) => {
        setDataSource(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} alt="Customer" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "addressLine1",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Typography.Title level={4} className="mb-4">Customers</Typography.Title>
      <div className="w-full max-w-screen-lg overflow-x-auto bg-white rounded-md">
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
    </div>
  );
}

export default Customers;

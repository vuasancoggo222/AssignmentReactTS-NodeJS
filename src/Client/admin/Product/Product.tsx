import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../Types/product";
import { Table, Tag, Space, Button, Modal,notification,message } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Categorylist } from "../../Api/category";
type ProductManagerProps = {
  data: ProductType[];
  onRemove: (id: number) => void;
};
type DataType = {
  key: React.Key;
  name: string;
  price: number;
  status: boolean;
  description: string;
  image?: any;
  category: string;
};
const ProductManager = (props: ProductManagerProps) => {
  const [category,setCategory] = useState([])
  const [visible, setVisible] = useState(false);
  const [description,setDescription] = useState([]);
  const getDescription =(record:any) =>{
    setVisible(true);
    console.log(record);
    setDescription(record);
  }
  useEffect(()=>{
  const getCategory = async () =>{
    const {data} = await Categorylist()
    console.log(data);
    setCategory(data)
  }
  getCategory()
  },[])
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "#",
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Thumbnail",
      key: "thumbnail",
     
      render :(record:any) => <img src={record.image.url} style={{ width: "80px"}} alt="" />
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (record: any) => (
        <Button onClick={()=> getDescription(record)}>View this description</Button>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary"><Link to={`/admin/product/${record._id}/edit`}>Update</Link></Button>
          <Button
            type="primary"
            danger
            onClick={() => props.onRemove(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title : <Button><Link to="/admin/product/add">Add</Link></Button>
    },
  ];
  const Productdata: DataType[] = props.data.map((item, index) => {
    return {
      _id: item._id,
      key: index + 1,
      name: item.name,
      price: item.price,
      status: item.status,
      description: item.description,
      image: item.image[0],
      category: item.category,
    };
  });
  return (
    <div>
      <Table
        style={{ marginLeft:"100px",width: "1170px"}}
        columns={columns}
        dataSource={Productdata}
        rowKey="key"
      >
      </Table>
      <Modal
      cancelText
        title="Mô tả sản phẩm"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
        mask
      ><p>{description}</p></Modal>
    </div>
  );
};

export default ProductManager;

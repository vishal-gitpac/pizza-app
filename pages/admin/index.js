import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const Index = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["Preparing", "On the way", "Delivered"];
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductList(productList.filter((product) => product._id !== id));
      alert("Product has been deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatus = async (id) => {
    try {
      const item = orderList.find((order) => order._id === id);
      const currentStatus = item.status;
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
      alert("Order has been updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}> Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </tbody>

          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.tr}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <h1 className={styles.title}> Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody>
              <tr className={styles.tr}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      handleStatus(order._id);
                    }}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
export const getServerSideProps = async () => {
  const productList = await axios.get("http://localhost:3000/api/products");
  const orderList = await axios.get("http://localhost:3000/api/orders");
  return {
    props: { products: productList.data, orders: orderList.data },
  };
};
export default Index;

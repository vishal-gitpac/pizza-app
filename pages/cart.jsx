import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.items.map((item) => (
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/img/pizza.png"
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{item.title}</span>
              </td>
              <td>
                {item.extras.map((extra) => (
                  <span className={styles.extras}>{extra.text}</span>
                ))}
              </td>
              <td>
                <span className={styles.price}>${item.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{item.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>
                  ${item.price * item.quantity}
                </span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.totalPrice}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.totalPrice}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

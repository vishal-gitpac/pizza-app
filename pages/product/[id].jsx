import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { additem } from "../../redux/cartslice";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const changeprice = (diff) => {
    setPrice(price + diff);
  };
  const handlePrice = (newsize) => {
    //algorithm to change price based on previous size and new size
    console.log(newsize);
    changeprice(pizza.prices[newsize] - pizza.prices[size]);
    setSize(newsize);
  };
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changeprice(option.price);
      setExtras([...extras, option]);
    } else {
      changeprice(-option.price);
      setExtras(extras.filter((extra) => extra.id !== option.id));
    }
  };
  const handleCart = (pizza) => {
    //this just adds extras , quantity and price to the pizza object along with the id, title and img
    dispatch(additem({ ...pizza, extras, quantity, price }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handlePrice(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handlePrice(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handlePrice(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => {
                  handleChange(e, option);
                }}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            className={styles.quantity}
          />
          <button
            className={styles.button}
            onClick={() => {
              handleCart(pizza);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  //you need `` not '' for the url for ${params.id}
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: await res.data,
    },
  };
};

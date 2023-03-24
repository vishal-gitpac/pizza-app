import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { baseurl } from "../baseurl/baserurl";

export default function Home({ pizzaList, admin }) {
  //console.log(pizzaList);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <button className={styles.button}>Add Pizza</button>}
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.auth === process.env.token) {
    admin = true;
  }
  const res = await axios.get(baseurl + "/products");
  return {
    props: {
      pizzaList: await res.data,
      admin: admin,
    },
  };
};

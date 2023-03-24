import styles from "../../styles/Login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      await axios.post("/api/login", { username, password });
      router.push("/admin");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin DashBoard</h1>

        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleLogin}>
          Sign In
        </button>
        {error && <p className={styles.error}>Wrong credentials</p>}
      </div>
    </div>
  );
};
export default Login;

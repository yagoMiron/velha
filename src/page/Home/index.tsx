import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <main>
      <Link className={styles.button} to={"/game"}>
        Participar
      </Link>
    </main>
  );
};
export default Home;

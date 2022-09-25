import Navbar from "../Navbar/Navbar";
import Trainer from "../Trainer/Trainer";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.highLevelLayout}>
        <Navbar />
        <Trainer />
      </div>
    </>
  );
}

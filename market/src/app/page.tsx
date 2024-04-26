import Image from "next/image";
import styles from "./page.module.css";
import { MenuBar } from "./components/menu/MenuBar";

export default function Home() {
  return (
    <>
      <MenuBar />
      <main className={styles.main}>
      </main>
    </>
  );
}

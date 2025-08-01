"use client";
import Image from "next/image";
import styles from "./navbar.module.css";

//Nav optional

export default function Navbar() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.logo}></div>
      {/* <Image
        src="/euro.png"
        alt=""
        width={25}
        height={25}
        className={styles.logo}
      ></Image> */}
      <span className = {styles.title} >Typemonkey</span>
      <a
        href="https://github.com/Mat-hew-24/typing-test-app"
        target="_blank"
        rel="noopener"
        className={styles.subLogo}
      >
        <div className={styles.subLogo}></div>

        {/* <Image
          src="https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/github.svg"
          alt="icon"
          width={35}
          height={35}
        /> */}
      </a>
    </div>
  );
}

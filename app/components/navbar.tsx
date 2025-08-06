"use client";
import Image from "next/image";
import styles from "./navbar.module.css";

function handleClick(){
  window.location.reload();
}

//Nav optional

export default function Navbar() {
  return (
    <div className={styles.mainDiv}>
      <div className="flex gap-2 cursor-pointer">
        <button onClick={handleClick}  className={styles.logo}></button>
        {/* <Image
        src="/euro.png"
        alt=""
        width={25}
        height={25}
        className={styles.logo}
        ></Image> */}
        <button onClick={handleClick} className={styles.title} >Typemonkey</button>
      </div>
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

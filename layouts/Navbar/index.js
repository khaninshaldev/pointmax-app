import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { BsFillHouseFill, BsGearFill, BsListCheck } from "react-icons/bs";

import styles from "./Navbar.module.scss";
import SignOutBtn from "../../features/common/SignOutBtn";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      {path === "/" || path === "/signUp" ? (
        ""
      ) : (
        <header className={styles.header}>
          <nav className={styles.nav}>
            <h2 className={styles.nav_brand}>Pointmax</h2>

            <ul className={styles.nav_list}>
              <Link href="/home">
                <li className={styles.nav_link}>
                  <BsFillHouseFill />
                  <span className={styles.nav_link_text}>Home</span>
                </li>
              </Link>

              <Link href="/lists">
                <li className={styles.nav_link}>
                  <BsListCheck />
                  <span className={styles.nav_link_text}>Lists</span>
                </li>
              </Link>

              <Link href="/settings">
                <li className={styles.nav_link}>
                  <BsGearFill />
                  <span className={styles.nav_link_text}>Settings</span>
                </li>
              </Link>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;

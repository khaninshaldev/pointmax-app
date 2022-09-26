import React from "react";
import Navbar from "../Navbar";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.layout_div}>
        <Navbar />
        <section className={styles.layout_section}>{children}</section>
      </div>
    </>
  );
};

export default Layout;

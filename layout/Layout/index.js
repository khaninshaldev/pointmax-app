import React from "react";
import Navbar from "../Navbar";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>{children}</div>
    </>
  );
};

export default Layout;

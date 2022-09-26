import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { auth } from "../../firebase/config";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const path = router.pathname;
  console.log(user);

  const handleSignOut = async () => {
    await signOut(auth).then(() => router.push("/"));
  };

  return (
    <>
      {path === "/" || path === "/signUp" ? (
        ""
      ) : (
        <header className={styles.header}>
          <nav className={styles.nav}>
            <h2>Pointmax</h2>

            <p className={styles.user_username}>
              {user ? `Logged in as ${user.displayName}` : ""}
            </p>
            <button onClick={handleSignOut}>Sign Out</button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;

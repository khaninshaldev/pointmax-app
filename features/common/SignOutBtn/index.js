import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/router";

import styles from "./SignOutBtn.module.scss";

const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth).then(() => router.push("/"));
  };
  return (
    <button className={`ghost-btn ${styles.signOut}`} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutBtn;

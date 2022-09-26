import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { auth } from "../../../firebase/config";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(auth, email, password).then(() =>
      router.push("/home")
    );

    setLoading(false);
  };
  return (
    <>
      <form className={styles.login_form} onSubmit={handleLogin}>
        <input
          ref={emailRef}
          type="email"
          placeholder="E-mail Address"
          required
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />

        <button className={styles.login_button} type="submit">
          {loading ? "Loading..." : "Log In"}
        </button>

        <hr className={styles.login_divider} />

        <Link href="/signUp">
          <button className="ghost-btn">Create an account</button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;

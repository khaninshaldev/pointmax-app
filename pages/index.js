import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";
import AuthForm from "../features/common/AuthForm";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/Login.module.scss";
import { auth } from "../firebase/config";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useUser();
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password).then(() =>
        router.push("/home")
      );
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Log in to Pointmax</title>
      </Head>
      <section className={styles.login_section}>
        <section>
          <h1 className={styles.login_heading}>
            Welcome back! Let&apos;s log in.
          </h1>
          <p className={styles.login_paragraph}>
            Enter your e-mail and password to proceed.
          </p>
        </section>

        <AuthForm
          authFunction={handleLogin}
          emailRef={emailRef}
          passwordRef={passwordRef}
          error={error}
          loading={loading}
          btnText="Log in"
          altBtnLink="/signUp"
          altBtnText="Create an Account"
        />
      </section>
    </>
  );
};

export default Login;

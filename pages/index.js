import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import LoginForm from "../features/Login/LoginForm";

import styles from "../styles/Login.module.scss";

const Login = () => {
  const { user } = useUser();
  const router = useRouter();

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
        <h1 className={styles.login_heading}>Login to proceed.</h1>

        <LoginForm />
      </section>
    </>
  );
};

export default Login;

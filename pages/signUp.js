import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import SignUpForm from "../features/SignUp/SignUpForm";

import styles from "../styles/SignUp.module.scss";

const SignUp = () => {
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
        <title>Join to Pointmax</title>
      </Head>
      <section className={styles.signup_section}>
        <h1 className={styles.signup_heading}>Join Pointmax now!</h1>

        <SignUpForm />
      </section>
    </>
  );
};

export default SignUp;

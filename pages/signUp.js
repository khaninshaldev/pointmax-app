import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";
import AuthForm from "../features/common/AuthForm";
import { auth, db } from "../firebase/config";

import styles from "../styles/SignUp.module.scss";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        await updateProfile(userCred.user, { displayName: name });
        await setDoc(doc(db, "lists", `default_daily_${userCred.user.uid}`), {
          name: "Daily tasks",
          userUID: userCred.user.uid,
        });
      }
    );
  };

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
        <section>
          <h1 className={styles.signup_heading}>Join Pointmax now!</h1>
          <p className={styles.signup_paragraph}>
            It&apos;s time to 10x your productivity.
          </p>
        </section>

        <AuthForm
          authFunction={handleSignUp}
          nameRef={nameRef}
          emailRef={emailRef}
          passwordRef={passwordRef}
          error={error}
          loading={loading}
          btnText="Get Started"
          altBtnLink="/"
          altBtnText="Log in to existing account"
        />
      </section>
    </>
  );
};

export default SignUp;

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { auth, db } from "../../../firebase/config";

import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

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
          userUID: userCred.user.uid,
        });
      }
    );

    setLoading(false);
  };
  return (
    <>
      <form className={styles.signup_form} onSubmit={handleSignUp}>
        <input ref={nameRef} type="text" placeholder="Real name" required />
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

        <button className={styles.signup_button} type="submit">
          {loading ? "Loading..." : "SignUp"}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;

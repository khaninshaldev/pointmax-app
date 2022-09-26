import Link from "next/link";
import React from "react";
import { HashLoader } from "react-spinners";

import styles from "./AuthForm.module.scss";

const AuthForm = ({
  authFunction,
  nameRef,
  emailRef,
  passwordRef,
  error,
  loading,
  btnText,
  altBtnLink,
  altBtnText,
}) => {
  return (
    <>
      <form className={styles.auth_form} onSubmit={authFunction}>
        {nameRef ? (
          <input ref={nameRef} type="text" placeholder="Name" required />
        ) : (
          ""
        )}
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

        {error && error != "" ? (
          <p className={styles.auth_error}>{error.message}</p>
        ) : (
          ""
        )}

        <button className={styles.auth_button} type="submit">
          {loading ? <HashLoader size={18} color="#fff" /> : btnText}
        </button>

        <hr className={styles.auth_divider} />

        <Link href={altBtnLink}>
          <button className="ghost-btn">{altBtnText}</button>
        </Link>
      </form>
    </>
  );
};

export default AuthForm;

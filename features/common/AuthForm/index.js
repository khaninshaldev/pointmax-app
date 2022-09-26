import Link from "next/link";
import React from "react";
import { HashLoader } from "react-spinners";
import { BsCardText, BsFillEnvelopeFill, BsFillLockFill } from "react-icons/bs";

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
          <section className={styles.auth_input_wrapper}>
            <div className={styles.auth_icon_div}>
              <BsCardText />
            </div>
            <input
              className={styles.auth_input}
              ref={nameRef}
              type="text"
              placeholder="Name"
              required
            />
          </section>
        ) : (
          ""
        )}
        <section className={styles.auth_input_wrapper}>
          <div className={styles.auth_icon_div}>
            <BsFillEnvelopeFill />
          </div>

          <input
            className={styles.auth_input}
            ref={emailRef}
            type="email"
            placeholder="E-mail Address"
            required
          />
        </section>
        <section className={styles.auth_input_wrapper}>
          <div className={styles.auth_icon_div}>
            <BsFillLockFill />
          </div>
          <input
            className={styles.auth_input}
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </section>

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

import { updateEmail, updateProfile } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../../contexts/UserContext";

import styles from "./SettingsForm.module.scss";

const SettingsForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();

  const nameRef = useRef();
  const emailRef = useRef();

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("I ran");

    const oldName = user.displayName;
    const oldEmail = user.email;

    const newName = nameRef.current.value;
    const newEmail = emailRef.current.value;

    if (newName !== oldName && newEmail !== oldEmail) {
      try {
        await updateProfile(user, { displayName: newName });
        await updateEmail(user, newEmail);
      } catch (err) {
        setError(err);
      }
    } else if (newName !== oldName) {
      try {
        await updateProfile(user, { displayName: newName });
      } catch (err) {
        setError(err);
      }
    } else if (newEmail !== oldEmail) {
      try {
        await updateEmail(user, newEmail);
      } catch (err) {
        setError(err);
      }
    }

    setLoading(false);
    setEditMode(false);
  };

  useEffect(() => console.log(loading), [loading]);

  return (
    <>
      {user ? (
        <form onSubmit={handleUpdateAccount} className={styles.settings_form}>
          <section className={styles.settings_account_section}>
            <h1>Account Settings</h1>

            {editMode ? (
              ""
            ) : (
              <button
                onClick={() => setEditMode(true)}
                type="button"
                className={`ghost-btn ${styles.settings_edit_button}`}>
                Edit
              </button>
            )}
          </section>

          {editMode ? (
            <>
              <label>
                Name
                <input ref={nameRef} defaultValue={user.displayName} />
              </label>

              <label>
                E-mail address
                <input ref={emailRef} defaultValue={user.email} />
              </label>

              {error ? <p>{error.message}</p> : ""}

              <button className={styles.settings_save_button} type="submit">
                {loading ? "Loading..." : "Save"}
              </button>
            </>
          ) : (
            <>
              <div>
                <label>Name:</label>
                <p>{user.displayName}</p>
              </div>
              <div>
                <label>E-mail address:</label>
                <p>{user.email}</p>
              </div>
            </>
          )}

          {/* <label>
            Password
            <input defaultValue={user.password} />
          </label> */}
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default SettingsForm;

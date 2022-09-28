import React from "react";
import SignOutBtn from "../features/common/SignOutBtn";
import SettingsForm from "../features/Settings/SettingsForm";

import styles from "../styles/Settings.module.scss";

const settings = () => {
  return (
    <section className={styles.settings_page}>
      <SettingsForm />
      <SignOutBtn />
    </section>
  );
};

export default settings;

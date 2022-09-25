import React, { useState } from "react";
import TasksList from "../features/common/TasksList";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/Home.module.scss";

const Home = () => {
  const { user } = useUser();

  return (
    <section className={styles.tasks_container}>
      <TasksList listId={`default_daily_${user?.uid}`} />
    </section>
  );
};

export default Home;

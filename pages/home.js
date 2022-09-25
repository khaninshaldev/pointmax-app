import React from "react";

import styles from "../styles/Home.module.scss";
import TasksList from "../features/common/TasksList";

const Home = () => {
  return (
    <section className={styles.tasks_container}>
      <TasksList />
    </section>
  );
};

export default Home;

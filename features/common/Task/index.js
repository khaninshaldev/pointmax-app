import React from "react";
import { BsCircle, BsPencilFill, BsThreeDots } from "react-icons/bs";

import styles from "./Task.module.scss";

const Task = ({ title }) => {
  return (
    <article className={styles.task}>
      <BsCircle className={styles.task_complete_circle} />
      <p className={styles.task_title}>{title}</p>

      <button className={styles.task_button_edit}>
        <BsPencilFill />
      </button>
      <button className={styles.task_button_menu}>
        <BsThreeDots />
      </button>
    </article>
  );
};

export default Task;

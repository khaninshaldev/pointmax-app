import React, { useRef, useState } from "react";
import {
  BsCheck2Circle,
  BsCircle,
  BsPencilFill,
  BsThreeDots,
} from "react-icons/bs";
import TaskDropdown from "../TaskDropdown";

import styles from "./Task.module.scss";

const Task = ({ id, title, isComplete }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownButtonRef = useRef();

  return (
    <article className={styles.task}>
      <section>
        {isComplete ? (
          <BsCheck2Circle className={styles.task_complete_circle} />
        ) : (
          <BsCircle className={styles.task_complete_circle} />
        )}
      </section>
      <p className={styles.task_title}>{title}</p>

      <button
        ref={dropdownButtonRef}
        onClick={() => {
          setDropdownActive(!dropdownActive);
        }}
        className={styles.task_button_menu}>
        <BsThreeDots />
      </button>

      {dropdownActive ? (
        <TaskDropdown
          taskId={id}
          dropdownActive={dropdownActive}
          setDropdownActive={setDropdownActive}
          dropdownButtonRef={dropdownButtonRef}
        />
      ) : (
        ""
      )}
    </article>
  );
};

export default Task;

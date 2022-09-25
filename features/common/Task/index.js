import React, { useRef, useState } from "react";
import { BsCircle, BsPencilFill, BsThreeDots } from "react-icons/bs";
import TaskDropdown from "../TaskDropdown";

import styles from "./Task.module.scss";

const Task = ({ id, title }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownButtonRef = useRef();

  return (
    <article className={styles.task}>
      <BsCircle className={styles.task_complete_circle} />
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

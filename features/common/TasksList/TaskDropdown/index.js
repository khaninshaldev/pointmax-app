import React, { useEffect, useRef } from "react";
import { useTasks } from "../../../../contexts/TasksContext";

import styles from "./TaskDropdown.module.scss";

const TaskDropdown = ({ taskId, setDropdownActive, dropdownButtonRef }) => {
  const { deleteTask } = useTasks();
  const dropdownRef = useRef();

  const handleDelete = async () => {
    await deleteTask(taskId);
  };

  useEffect(() =>
    document.addEventListener("mousedown", (e) => {
      if (dropdownRef.current && dropdownButtonRef.current) {
        if (
          !dropdownRef.current.contains(e.target) &&
          !dropdownButtonRef.current.contains(e.target)
        ) {
          setDropdownActive(false);
        }
      }
    })
  );

  return (
    <section ref={dropdownRef} className={styles.dropdown_section}>
      <ul className={styles.dropdown_list}>
        <li className={styles.dropdown_list_item}>
          <button className={styles.dropdown_edit_button}>Edit</button>
        </li>
        <li onClick={handleDelete} className={styles.dropdown_list_item}>
          <button className={styles.dropdown_delete_button}>Delete</button>
        </li>
      </ul>
    </section>
  );
};

export default TaskDropdown;

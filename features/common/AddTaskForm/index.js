import React, { useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTasks } from "../../../contexts/TasksContext";
import { SyncLoader } from "react-spinners";

import styles from "./AddTaskForm.module.scss";

const AddTaskForm = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addTask } = useTasks();

  const titleRef = useRef();

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = titleRef.current.value;
    titleRef.current.value = "";

    await addTask(title);
    setInputFocus(false);
    setLoading(false);
  };

  return (
    <section className={styles.addTask_section}>
      {loading ? (
        <SyncLoader size="6" color="white" />
      ) : (
        <form
          onSubmit={handleAddTask}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          className={styles.addTask_form}>
          <input
            ref={titleRef}
            className={styles.addTask_input}
            placeholder="Click here to add a task"
          />

          {inputFocus ? (
            <button type="submit" className={styles.addTask_button}>
              <BsArrowRightCircle />
            </button>
          ) : (
            ""
          )}
        </form>
      )}
    </section>
  );
};

export default AddTaskForm;

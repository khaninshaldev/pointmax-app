import React from "react";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import styles from "./TasksList.module.scss";
import { useTasks } from "../../../contexts/TasksContext";
import { HashLoader } from "react-spinners";

const TasksList = ({ list_heading }) => {
  const { loading, error, tasks } = useTasks();

  return (
    <>
      {loading ? (
        <section className={styles.tasks_loading_section}>
          <section className={styles.tasks_loading}>
            <HashLoader size={64} color="#ffffff" />
          </section>
        </section>
      ) : (
        <section className={styles.tasks_section_wrapper}>
          <section className={styles.tasks_top_section}>
            <h2 className={styles.tasks_heading}>
              {list_heading ? list_heading : "Daily tasks"}
            </h2>
          </section>

          <section className={styles.tasks_section}>
            {tasks.length === 0 ? (
              <p className={styles.tasks_empty_text}>
                Oh shoot, you don&apos;t have any tasks!
              </p>
            ) : (
              <>
                {tasks?.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      isComplete={task.isComplete}
                    />
                  );
                })}
              </>
            )}

            <AddTaskForm />
          </section>
        </section>
      )}
    </>
  );
};

export default TasksList;

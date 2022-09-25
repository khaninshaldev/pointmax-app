import React, { useEffect } from "react";
import AddTaskForm from "../AddTaskForm";
import Task from "../Task";
import styles from "./TasksList.module.scss";
import { useTasks } from "../../../contexts/TasksContext";

const TasksList = ({ listId }) => {
  const { setListId, loading, error, tasks } = useTasks();

  useEffect(() => {
    setListId(listId);
  }, [listId, setListId]);
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <section className={styles.tasks_top_section}>
            <h1 className={styles.tasks_heading}>Tasks</h1>
          </section>

          <section className={styles.tasks_section}>
            {tasks.length === 0 ? (
              <p className={styles.tasks_empty_text}>
                Oh shoot, you don&apos;t have any tasks!
              </p>
            ) : (
              <>
                {tasks?.map((task) => {
                  return <Task key={task.id} title={task.title} />;
                })}
              </>
            )}

            <AddTaskForm listId={listId} />
          </section>
        </>
      )}
    </>
  );
};

export default TasksList;

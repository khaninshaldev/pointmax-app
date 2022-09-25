import React, {
  useReducer,
  useEffect,
  useContext,
  createContext,
  useState,
  useMemo,
} from "react";
import {
  tasksReducer,
  INITIAL_TASKS_STATE,
  TASKS_ACTION_TYPES,
} from "../reducers/tasksReducer";

import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const TasksCtx = createContext();

export const useTasks = () => useContext(TasksCtx);

const TasksContext = ({ children }) => {
  const tasksCollection = collection(db, "tasks");

  const [listId, setListId] = useState(null);

  const [state, dispatch] = useReducer(tasksReducer, INITIAL_TASKS_STATE);
  const { loading, error, tasks } = state;

  const addTask = async (title) => {
    const taskData = {
      title,
      isComplete: false,
      desc: "",
      createdAt: serverTimestamp(),
      listId,
    };

    await addDoc(tasksCollection, taskData).then((task) =>
      dispatch({
        type: TASKS_ACTION_TYPES.ADD_NEW_TASK,
        payload: [...tasks, { id: task.id, ...taskData }],
      })
    );
  };

  useMemo(() => {
    const fetchTasks = async () => {
      const tasksArray = [];

      try {
        const taskDocs = await getDocs(
          query(collection(db, "tasks"), where("listId", "==", listId))
        );
        taskDocs.forEach((task) => {
          tasksArray.push({ id: task.id, ...task.data() });
        });

        dispatch({
          type: TASKS_ACTION_TYPES.FETCH_SUCCESS,
          payload: tasksArray,
        });
      } catch (error) {
        dispatch({
          type: TASKS_ACTION_TYPES.FETCH_ERROR,
          error,
        });
      }
    };
    fetchTasks();
  }, [listId]);

  return (
    <TasksCtx.Provider value={{ setListId, loading, error, tasks, addTask }}>
      {children}
    </TasksCtx.Provider>
  );
};

export default TasksContext;

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
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useRouter } from "next/router";
import { useUser } from "./UserContext";

export const TasksCtx = createContext();

export const useTasks = () => useContext(TasksCtx);

const TasksContext = ({ children }) => {
  const tasksCollection = collection(db, "tasks");

  const { user } = useUser();

  const router = useRouter();
  const path = router.pathname;
  const [listId, setListId] = useState(null);

  useMemo(() => {
    if (user) {
      if (path === "/home") {
        setListId(`default_daily_${user.uid}`);
      }
    }
  }, [path, user]);

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

  const deleteTask = async (id) => {
    const taskArray = tasks.filter((task) => {
      return task.id !== id;
    });

    dispatch({ type: TASKS_ACTION_TYPES.DELETE_TASK, payload: taskArray });

    await deleteDoc(doc(db, "tasks", id));
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
    <TasksCtx.Provider value={{ loading, error, tasks, addTask, deleteTask }}>
      {children}
    </TasksCtx.Provider>
  );
};

export default TasksContext;

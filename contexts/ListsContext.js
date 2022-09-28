import { collection, getDocs, query, where } from "firebase/firestore";
import React, {
  useReducer,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from "react";
import { db } from "../firebase/config";
import {
  INITIAL_LISTS_STATE,
  LISTS_ACTION_TYPES,
  listsReducer,
} from "../reducers/listsReducer";
import { useUser } from "./UserContext";

export const ListsCtx = createContext();

export const useLists = () => useContext(ListsCtx);

const ListsContext = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, INITIAL_LISTS_STATE);
  const { loading, error, lists } = state;
  const { user } = useUser();

  useMemo(() => {
    const fetchLists = async () => {
      if (user) {
        const listsArray = [];

        try {
          const listDocs = await getDocs(
            query(collection(db, "lists"), where("userUID", "==", user.uid))
          );
          listDocs.forEach((list) => {
            listsArray.push({ id: list.id, ...list.data() });
          });

          dispatch({
            type: LISTS_ACTION_TYPES.FETCH_SUCCESS,
            payload: listsArray,
          });
        } catch (error) {
          dispatch({
            type: LISTS_ACTION_TYPES.FETCH_ERROR,
            error,
          });
        }
      }
    };

    fetchLists();
  }, [user]);

  useEffect(() => console.log(state), [state]);

  return (
    <ListsCtx.Provider value={{ loading, error, lists }}>
      {children}
    </ListsCtx.Provider>
  );
};

export default ListsContext;

export const INITIAL_TASKS_STATE = {
  loading: true,
  error: null,
  tasks: [],
};

export const TASKS_ACTION_TYPES = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_NEW_TASK: "ADD_NEW_TASK",
  DELETE_TASK: "DELETE_TASK",
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    // Actions for Fetching Tasks from a List
    case "FETCH_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Actions for Adding a new Task
    case "ADD_NEW_TASK":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };

    // Action to delete a Task
    case "DELETE_TASK":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

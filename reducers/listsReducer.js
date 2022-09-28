export const INITIAL_LISTS_STATE = {
  loading: true,
  error: null,
  lists: [],
};

export const LISTS_ACTION_TYPES = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_NEW_LIST: "ADD_NEW_LIST",
  DELETE_LIST: "DELETE_LIST",
};

export const listsReducer = (state, action) => {
  switch (action.type) {
    // Actions for Fetching lists
    case "FETCH_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Actions for Adding a new List
    case "ADD_NEW_LIST":
      return {
        ...state,
        loading: false,
        lists: action.payload,
      };

    // Action to delete a List
    case "DELETE_LIST":
      return {
        ...state,
        loading: false,
        lists: action.payload,
      };
    default:
      return state;
  }
};

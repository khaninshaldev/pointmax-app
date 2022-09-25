import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase/config";

const UsersCtx = createContext();
export const useUser = () => useContext(UsersCtx);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => setUser(user));

    return unsubAuth;
  }, []);

  return <UsersCtx.Provider value={{ user }}>{children}</UsersCtx.Provider>;
};

export default UserContext;

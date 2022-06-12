import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Auth, Storage, db } from "../Firebase/Config";

export const Firebasedb = createContext(null);
export const AuthContext = createContext(null);

function FirebaseContext({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(Auth, (person) => {
      if (person) {
        setUser(person);
      }
    });
  }, []);
  return (
    <Firebasedb.Provider value={{ Auth, Storage, db }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </Firebasedb.Provider>
  );
}

export default FirebaseContext;

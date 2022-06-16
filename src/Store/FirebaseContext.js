import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Auth, Storage, db } from "../Firebase/Config";

export const Firebasedb = createContext(null);
export const AuthContext = createContext(null);

function FirebaseContext({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [superAdmin, setSuperAdmin] = useState(null);
  useEffect(() => {
    onAuthStateChanged(Auth, (person) => {
      if (person) {
        const qry = query(
          collection(db, "admins"),
          where("uid", "==", person.uid)
        );
        getDocs(qry).then((res) => {
          let [data] = res.docs.map((r) => r.data());
          if (data) {
            if (data.superAdmin === true) {
              setSuperAdmin(person);
            } else {
              setAdmin(person);
            }
          } else {
            setUser(person);
          }
        });
      }
    });
  }, []);
  return (
    <Firebasedb.Provider value={{ Auth, Storage, db }}>
      <AuthContext.Provider
        value={{ user, setUser, admin, setAdmin, superAdmin, setSuperAdmin }}
      >
        {children}
      </AuthContext.Provider>
    </Firebasedb.Provider>
  );
}

export default FirebaseContext;

import { createContext, useContext, useState } from "react";

export const Registrations = createContext(null);
function RegContexts({ children }) {
  const [details, setDetails] = useState();
  return (
    <Registrations.Provider value={{ details, setDetails }}>
      {children}
    </Registrations.Provider>
  );
}

export default RegContexts;

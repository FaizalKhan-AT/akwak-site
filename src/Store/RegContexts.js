import { createContext, useState } from "react";

export const Registrations = createContext(null);
function RegContexts({ children }) {
  const [details, setDetails] = useState();
  const [id, setId] = useState();
  return (
    <Registrations.Provider value={{ details, setDetails, id, setId }}>
      {children}
    </Registrations.Provider>
  );
}

export default RegContexts;

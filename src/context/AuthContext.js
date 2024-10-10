import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [uuid, setUuid] = useState(null);

  const login = (uuid) => {
    setUuid(uuid);
  };

  const logout = () => {
    setUuid(null);
  };

  return (
    <AuthContext.Provider value={{ uuid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

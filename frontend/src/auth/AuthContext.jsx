import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, clearToken } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(false);

  // Validate any existing token on first load.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }
    api
      .me()
      .then((res) => setAdmin(res.admin))
      .catch(() => clearToken())
      .finally(() => setReady(true));
  }, []);

  const login = async (email, password) => {
    const { token, admin: who } = await api.login(email, password);
    setToken(token);
    setAdmin(who);
  };

  const logout = () => {
    clearToken();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, ready, login, logout, isAuthed: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { useCallback } from "react";
import { useAppStore } from "../store/useAppStore";

export const useLogout = () => {
  const logout = useAppStore(state => state.logout);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return handleLogout;
};

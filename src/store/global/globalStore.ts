import { useState, useEffect } from "react";
import { IAuth } from "../../models/store.model";

const useGlobalStore = () => {
  const [authState, setAuthState] = useState<IAuth>({
    isAuthenticated: false,
    accessToken: null,
  });

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken-step");
    if (accessToken) {
      // check validity of accessToken
      setAuthState({
        isAuthenticated: true,
        accessToken: accessToken,
      });
    }
  }, []);

  const login = (username: string, password: string) => {
      // send request to server with username and password
  };

  const register = (username: string, password: string) => {
      // send request to server with username and password
  };

  return {
    authState,
    login,
    register,
  };
};

export { useGlobalStore };

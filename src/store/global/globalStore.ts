import { useState, useEffect } from "react";
import { createStore } from "reusable";
import { IAuth, IToken } from "../../models/store.model";
import { IUser, IUserAuth } from "../../models/user.model";
import { httpService } from "../../service/http.service";

const useGlobalStore = createStore(() => {
  const [authState, setAuthState] = useState<IAuth>({
    isAuthenticated: false,
    accessToken: null,
    expiresOn: null,
  });

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const tokenStr = window.localStorage.getItem("token-step");
    const token: IToken | null = tokenStr ? JSON.parse(tokenStr) : null;
    if (token) {
      // check validity of accessToken
      const expiresOn: string = token.expiresOn!;
      const currentTimestamp = new Date().getTime() / 1000;

      if (+expiresOn - currentTimestamp) {
        setAuthState({
          isAuthenticated: true,
          accessToken: token.accessToken,
          expiresOn: expiresOn,
        });

        setUser({
          id: token.user!.id,
          username: token.user!.username
        })
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        accessToken: null,
        expiresOn: null
      });
    }
    
    //eslint-disable-next-line
  }, []);

  const login = async (usr: IUserAuth) => {
    // send request to server with username and password
    const res = await httpService.post("/api/v1/users/auth", usr);

    if (res && res.data) {
      window.localStorage.setItem("token-step", JSON.stringify(res.data));
      setAuthState({
        isAuthenticated: true,
        accessToken: res.data.accessToken,
        expiresOn: res.data.expiresOn
      });

      console.log(res);
      setUser({
        id: res.data.user.id,
        username: res.data.user.username
      });

    } else {
      // error handling will be here
      console.log("Something went wrong");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token-step");
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      expiresOn: null
    });

    setUser(null);
  }
  const register = async (usr: IUserAuth) => {
    // send request to server with username and password
    const res = await httpService.post("/api/v1/users/register", usr);

    if (res && res.data) {
      window.localStorage.setItem("token-step", JSON.stringify(res.data)); // write item to local storage
      setAuthState({
        isAuthenticated: true,
        accessToken: res.data.accessToken,
        expiresOn: res.data.expiresOn
      });
      setUser({
        id: res.data.user.id,
        username: res.data.user.username
      })
    } else {
      // display error message
      console.log("Something went wrong");
    }
  };

  return {
    authState,
    user,
    login,
    logout,
    register,
  };
});

export { useGlobalStore };

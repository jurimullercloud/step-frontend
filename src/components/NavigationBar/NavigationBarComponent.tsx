import React, { useEffect, useState } from "react";
import { IUserAuth } from "../../models/user.model";
import { useGlobalStore } from "../../store/global/globalStore";
import { NavigationBar } from "./NavigationBar";

const NavigationBarComponent: React.FC = () => {
  const { authState, user, login, logout } = useGlobalStore();
  
  const [loggedInAs, setLoggedInAs] = useState<string | null>(null);
  const [userLogin, setUserLogin] = useState<IUserAuth>({
    username: null,
    password: null,
  });

  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [logoutClicked, setlogoutClicked] = useState<boolean>(false);

  useEffect(() => {
    if (user)
      setLoggedInAs(user.username);
  }, [user]);


  useEffect(() => {
    if (loginClicked) {
      const func = async () => {
        await login(userLogin);
        setUserLogin({
            username: null,
            password: null
        });
        setLoginClicked(false);
      };

      func();
    }

    // eslint-disable-next-line
  }, [loginClicked]);

  useEffect(() => {
    if (logoutClicked) {
      const func = async () => {
        await logout();
        setLoginClicked(false);
      };

      func();
    }

    // eslint-disable-next-line
  }, [logoutClicked]);

  const userInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    source: "username" | "password"
  ) => {
    switch (source) {
      case "username":
        return setUserLogin({
          ...userLogin,
          username: e.target.value,
        });
      case "password":
        return setUserLogin({
          ...userLogin,
          password: e.target.value,
        });
    }
  };

  const userLoginHandler = () => setLoginClicked(true);

  const userLogoutHandler = () => setlogoutClicked(true);

  return (
    <NavigationBar
      isAuthenticated={authState.isAuthenticated}
      username={loggedInAs}
      userLogin={userLogin}
      onUserInput={userInputHandler}
      onUserLogin={userLoginHandler}
      onUserLogout={userLogoutHandler}
    />
  );
};

export { NavigationBarComponent };

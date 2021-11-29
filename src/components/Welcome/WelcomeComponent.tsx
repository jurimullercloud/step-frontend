import React, { useState } from "react";
import { IUserAuth } from "../../models/user.model";
import { useGlobalStore } from "../../store/global/globalStore";
import { WelcomePage } from "./Welcome";

const WelcomeComponent: React.FC = () => {
  const { register } = useGlobalStore();
  const [userRegister, setUserRegister] = useState<IUserAuth>({
    username: null,
    password: null,
  });

  const userInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    source: "username" | "password"
  ) => {
    switch (source) {
      case "username":
        return setUserRegister({
          ...userRegister,
          username: e.target.value,
        });

      case "password":
        return setUserRegister({
          ...userRegister,
          password: e.target.value,
        });
    }
  };

  const signUpHandler = () =>
    register(userRegister.username!, userRegister.password!);

  return (
    <WelcomePage
      userRegister={userRegister}
      onUserInput={userInputHandler}
      onSignUp={signUpHandler}
    />
  );
};

export { WelcomeComponent };

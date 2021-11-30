import React from "react";
import styles from "./App.module.scss";
import classnames from "classnames/bind";
import { NavigationBarComponent } from "./components/NavigationBar/NavigationBarComponent";
import { ContactsListComponent } from "./components/ContactsList/ContactsListComponent";
import { ContactDetailsComponent } from "./components/ContactDetails/ContactDetailsComponent";
import { useGlobalStore } from "./store/global/globalStore";
import { WelcomeComponent } from "./components/Welcome/WelcomeComponent";

const cx = classnames.bind(styles);

function App() {
  const { authState, user } = useGlobalStore();

  return (
    <div className={cx("App")}>
      <NavigationBarComponent />
      {!authState.isAuthenticated 
        ? <WelcomeComponent />
        : (
          <div className={cx("contacts-container")}>
            <ContactsListComponent />
            <ContactDetailsComponent />
          </div>
      )}
    </div>
  );
}

export default App;

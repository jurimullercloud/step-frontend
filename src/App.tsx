import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import classnames from "classnames/bind";
import { NavigationBarComponent } from './components/NavigationBar/NavigationBarComponent';
import { ContactsListComponent } from './components/ContactsList/ContactsListComponent';
import { ContactDetailsComponent } from './components/ContactDetails/ContactDetailsComponent';

const cx = classnames.bind(styles);

function App() {
  return (
    <div className={cx("App")}>
      <NavigationBarComponent />
      <div className = {cx("contacts-container")}>
        <ContactsListComponent />
        <ContactDetailsComponent />
      </div>
    </div>
  );
}

export default App;

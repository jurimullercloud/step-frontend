import React from "react";
import styles from "./NavigationBar.module.scss";
import classnames from "classnames/bind";
import Logo from "./../../assets/icon.png"
import { Navbar, Button} from "react-bootstrap";

const cx = classnames.bind(styles);
const NavigationBar: React.FC = () => {
  return (
    <Navbar className={cx("navigation-bar")}>
        <div className={cx("navigation-bar--app-brand")}>
            <img src = {Logo} alt=""/>
            <span>STEPhoneBook</span>
        </div>
        <div className={cx("navigation-bar--user")}>
          <Button className={cx("login-btn")}variant="success" size="sm">
            Sign In
          </Button>
        </div>
    </Navbar>
  );
};

export { NavigationBar };

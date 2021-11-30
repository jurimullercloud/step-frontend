import React from "react";
import styles from "./NavigationBar.module.scss";
import classnames from "classnames/bind";
import Logo from "./../../assets/icon.png";
import { Navbar, Button, Form, Row, Col } from "react-bootstrap";
import { IUserAuth } from "../../models/user.model";

const cx = classnames.bind(styles);

interface IProps {
  isAuthenticated: boolean;
  username: string | null;
  userLogin: IUserAuth;
  onUserInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    source: "username" | "password"
  ) => void;
  onUserLogin: () => void;
  onUserLogout: () => void;
}

const NavigationBar: React.FC<IProps> = ({
  isAuthenticated,
  username,
  userLogin,
  onUserInput,
  onUserLogin,
  onUserLogout,
}) => {
  return (
    <Navbar className={cx("navigation-bar")}>
      <div className={cx("navigation-bar--app-brand")}>
        <img src={Logo} alt="" />
        <span>STEPhoneBook</span>
      </div>
      <div className={cx("navigation-bar--user")}>
        {!isAuthenticated ? (
          <div className={cx("user-not-signed")}>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onUserInput(e, "username")
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onUserInput(e, "password")
                    }
                  />
                </Col>
              </Row>
            </Form>
            <Button
              className={cx("login-btn")}
              variant="success"
              size="sm"
              onClick={onUserLogin}
              disabled={!userLogin.password || !userLogin.username}
            >
              Sign In
            </Button>
          </div>
        ) : (
          <div className={cx("user-signed")}>
            <span>
              Signed in as {" "}
              <b>
                {username!}
              </b>
            </span>
            <Button
              className={cx("login-btn")}
              variant="success"
              size="sm"
              onClick={onUserLogout}
            >
              Log Out
            </Button>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export { NavigationBar };

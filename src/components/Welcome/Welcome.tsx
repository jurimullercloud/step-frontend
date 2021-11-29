import React, { VoidFunctionComponent } from "react";
import styles from "./Welcome.module.scss";
import classnames from "classnames/bind";
import { Button, Form } from "react-bootstrap";
import { IUserAuth } from "../../models/user.model";

const cx = classnames.bind(styles);


interface IProps {
    userRegister: IUserAuth;
    onUserInput: (e: React.ChangeEvent<HTMLInputElement>, source: "username" | "password") => void;
    onSignUp:    () => void;
};

const WelcomePage: React.FC<IProps> = ({
    userRegister,
    onUserInput,
    onSignUp
}) => {
  return (
    <div className={cx("welcome-wrapper-container")}>
      <div className={cx("welcome-page--container")}>
        <div className={cx("app-info")}>
          <span className={cx("h")}>Welcome to STEPhoneBook App</span>
          <br />
          <span className={cx("b")}>
            This app is designed to demonstrate the minimal scale full stack
            application that is deployed to <b>AWS cloud environment</b> using{" "}
            <b>Autoscaling Groups</b> and <b>Application Load Balancers</b>{" "}
            through <b>Terraform</b> as IaaC engine.
          </span>
        </div>
        <div className={cx("sign-up-form")}>
          <div>
            <span className={cx("hf")}>Create a User to get going</span><br />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Control type="text" placeholder="Enter username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserInput(e, "username")} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserInput(e, "password")} />
              </Form.Group>
              <span className={cx("bf")}>Or <strong>Sign In</strong> if you already have an account</span>
              <Button variant="success" 
                      size="sm" 
                      onClick ={onSignUp}
                      disabled={!userRegister.username || !userRegister.password}>
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export { WelcomePage };

import React from "react";
import styles from "./ContactDetails.module.scss";
import classnames from "classnames/bind";
import Avatar from "./../../assets/avatar2.png";
import { Button } from "react-bootstrap";
import { Pen, TrashFill } from "react-bootstrap-icons";

const cx = classnames.bind(styles);

const ContactDetails: React.FC = () => {
  return (
    <div className={cx("contact-details")}>
      <div className={cx("contact-details--contact-card")}>
        <div className={cx("contact-avatar--container")}>
          <div className={cx("avatar")}>
            <img src={Avatar} alt="" />
          </div>
        </div>
        <div className={cx("contact-info")}>
          <div></div>
          <div></div>
          <div className={cx("contact-info--info")}>
            <div className={cx("info-1")}>
              <label>Name</label>
              <input type="text" id="fname" name="fname"></input>
              <button ><Pen /></button>
            </div>
            <div className={cx("info-1")}>
              <label>Phone Number</label>
              <input type="text"></input>
              <button><Pen /></button>
            </div>
          </div>
          <div className={cx("contact-info--actions")}>
              <Button variant="danger" size="sm"> <TrashFill /> Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactDetails };

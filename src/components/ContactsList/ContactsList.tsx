import React from "react";
import styles from "./ContactsList.module.scss";
import classnames from "classnames/bind";
import { Button, ListGroup } from "react-bootstrap";
import { Check2Circle, CheckAll, PlusCircle, TrashFill } from "react-bootstrap-icons";
const cx = classnames.bind(styles);

const ContactsList: React.FC = () => {
  return (
    <div className={cx("contacts-list")}>
      <div className={cx("contacts-list--actions")}>
        <div className={cx("btn-group-1")}>
          <Button size="sm" variant="secondary">
            <Check2Circle /> Select
          </Button>
          <Button size="sm" variant="success">
            <PlusCircle /> Add
          </Button>
        </div>
        <div className={cx("btn-group-2")}>
          <Button className = {cx("select-all-btn")} size="sm" variant="secondary">
            <CheckAll /> All
          </Button>
          <Button size="sm" variant="danger">
            <TrashFill /> Delete
          </Button>
        </div>
      </div>
      <div className={cx("contacts-list--list")}>
        <ListGroup>
          <ListGroup.Item as="li" className={cx("active")} active>
            <div>
              <input type="checkbox" />
            </div>
            Cras justo odio
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <div>
              <input type="checkbox" />
            </div>
            Dapibus ac facilisis in
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <div>
              <input type="checkbox" />
            </div>
            Morbi leo risus
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <div>
              <input type="checkbox" />
            </div>
            Porta ac consectetur ac
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export { ContactsList };

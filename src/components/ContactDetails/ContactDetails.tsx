import React from "react";
import styles from "./ContactDetails.module.scss";
import classnames from "classnames/bind";
import Avatar from "./../../assets/avatar2.png";
import { Button, Col, Form, Row } from "react-bootstrap";
import { PencilSquare, SdCard, TrashFill, XCircle } from "react-bootstrap-icons";
import { IFormContact, IContact } from "../../models/contact.model";

const cx = classnames.bind(styles);

interface IProps {
  contact: IFormContact;
  viewMode: "add" | "view" | "edit";
  onContactDataChanged: (e: React.ChangeEvent<HTMLInputElement>, source: "name" | "phone") => void;
  onSaveContactClicked: () => void;
  onSaveEditsClicked: () => void;
  onEditContactClicked: () => void;
  onCancelAddClicked: () => void;
  onCancelEditClicked: () => void;
  onDeleteContactClicked: () => void;
}

const ContactDetails: React.FC<IProps> = ({
  contact,
  viewMode,
  onContactDataChanged,
  onSaveContactClicked,
  onSaveEditsClicked,
  onEditContactClicked,
  onCancelAddClicked,
  onCancelEditClicked,
  onDeleteContactClicked
}) => {
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
            <Form className={cx("info-form")}>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    value={contact.name}
                    placeholder="Contact Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onContactDataChanged(e, "name")
                    }
                    className={cx({ active: viewMode !== "view" })}
                    plaintext
                    disabled={viewMode === "view"}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Form>
            <Form className={cx("info-form")}>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Phone Number
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    value={contact.phone}
                    plaintext
                    placeholder="Number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onContactDataChanged(e, "phone")
                    }
                    className={cx({ active: viewMode !== "view" })}
                    disabled={viewMode === "view"}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </div>
          <div className={cx("contact-info--actions")}>
            {viewMode === "add" ? (
              <>
                <Button variant="success" size="sm" onClick={onSaveContactClicked}>
                  <SdCard /> Save Contact
                </Button>
                <Button variant="danger" size="sm" onClick={onCancelAddClicked}>
                  {" "}
                  <XCircle /> Cancel
                </Button>
              </>
            ) : viewMode == "edit" ? (
              <>
                <Button variant="success" size="sm" onClick={onSaveEditsClicked}>
                  <SdCard /> Save Changes
                </Button>
                <Button variant="danger" size="sm" onClick={onCancelEditClicked}>
                  {" "}
                  <XCircle /> Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="success" size="sm" onClick={onEditContactClicked}>
                  <PencilSquare /> Change Contact Details
                </Button>
                <Button variant="danger" size="sm" onClick={onDeleteContactClicked}>
                  {" "}
                  <TrashFill /> Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactDetails };

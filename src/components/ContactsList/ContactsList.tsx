import React from "react";
import styles from "./ContactsList.module.scss";
import classnames from "classnames/bind";
import { Button, ListGroup } from "react-bootstrap";
import { Check2Circle, CheckAll, PlusCircle, TrashFill } from "react-bootstrap-icons";
import { IContact } from "../../models/contact.model";
const cx = classnames.bind(styles);

interface IProps {
  contacts: IContact[];
  selectedContacts: IContact[] | null;
  currentlyViewedContact: IContact | null;
  viewMode: "view" | "select";
  onSelectModeClicked: () => void;
  onContactSelected: (contactId: number) => void;
  onContactClicked: (contactId: number) => void;
  onAddClicked: () => void;
  onSelectAllClicked: () => void;
  onDeleteSelectedClicked: () => void;
}

const ContactsList: React.FC<IProps> = ({
  contacts,
  selectedContacts,
  currentlyViewedContact,
  viewMode,
  onSelectModeClicked,
  onSelectAllClicked,
  onAddClicked,
  onContactClicked,
  onContactSelected,
  onDeleteSelectedClicked
}) => {
  return (
    <div className={cx("contacts-list")}>
      <div className={cx("contacts-list--actions")}>
        <div className={cx("btn-group-1")}>
          <Button size="sm" variant="secondary" onClick={onSelectModeClicked}>
            <Check2Circle /> {viewMode === "view" ? "Select" : "Cancel"}
          </Button>
          <Button size="sm" variant="success" onClick={onAddClicked}>
            <PlusCircle /> Add
          </Button>
        </div>
        <div className={cx("btn-group-2")}>
          <Button
            className={cx("select-all-btn")}
            size="sm"
            variant="secondary"
            disabled={viewMode !== "select"}
            onClick={onSelectAllClicked}
          >
            <CheckAll /> All
          </Button>
          <Button
            size="sm"
            variant="danger"
            disabled={!selectedContacts}
            onClick={onDeleteSelectedClicked}
          >
            <TrashFill /> Delete
          </Button>
        </div>
      </div>
      <div className={cx("contacts-list--list")}>
        <ListGroup>
          {contacts.map((c) => (
            <ListGroup.Item
              key={c.id}
              as="li"
              className={cx({"active": currentlyViewedContact && currentlyViewedContact.id === c.id})}
              onClick={() => onContactClicked(c.id)}
            >
              {viewMode === "select" ? (
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      e.stopPropagation();
                      onContactSelected(c.id);
                    }}
                    checked={selectedContacts != null && selectedContacts!.findIndex( sc => sc.id === c.id) !== -1}
                  />
                </div>
              ) : null}
              {c.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export { ContactsList };

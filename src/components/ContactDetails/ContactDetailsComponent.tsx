import React, { useEffect, useState } from "react";
import { IFormContact } from "../../models/contact.model";
import { useContactsStore } from "../../store/global/contactsStore";
import { useGlobalStore } from "../../store/global/globalStore";
import { ContactDetails } from "./ContactDetails";

const ContactDetailsComponent: React.FC = () => {
  const { user } = useGlobalStore();
  const {
    currentlyViewedContact,
    contactDetailsViewMode,
    saveContactHandler,
    cancelAddContactHandler,
    editContactHandler,
    cancelEditContactHandler,
    updateContact,
    deleteContact,

  } = useContactsStore();

  const [contactData, setContactData] = useState<IFormContact>({
    name: "",
    phone: ""
  });

  useEffect(() => {
    if (currentlyViewedContact && contactDetailsViewMode === "view") {
      setContactData({
        name: currentlyViewedContact.name,
        phone: currentlyViewedContact.phone.toString()
      });
    }
    // eslint-disable-next-line
  }, [currentlyViewedContact, contactDetailsViewMode]);


  useEffect(() => {
    if (contactDetailsViewMode === "add") {
      setContactData({
        name: "",
        phone: ""
      });
    }
    // eslint-disable-next-line
  }, [contactDetailsViewMode]);

  const contactDataChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    source: "name" | "phone"
  ) => {
    switch (source) {
      case "name":
        return setContactData({
          ...contactData,
          name: e.target.value
        });
      case "phone":
        return setContactData({
          ...contactData,
          phone: e.target.value
        });
    }
  };

  return contactDetailsViewMode !== null ? (
    <ContactDetails
      onContactDataChanged={contactDataChangeHandler}
      contact={contactData}
      viewMode={contactDetailsViewMode}
      onSaveContactClicked={() => saveContactHandler(user!.id, contactData)}
      onSaveEditsClicked={() => updateContact(user!.id, currentlyViewedContact!.id, contactData)}
      onCancelAddClicked={cancelAddContactHandler}
      onEditContactClicked={editContactHandler}
      onCancelEditClicked={cancelEditContactHandler}
      onDeleteContactClicked={() => deleteContact(user!.id, currentlyViewedContact!.id)}
    />
  ) : null;
};

export { ContactDetailsComponent };

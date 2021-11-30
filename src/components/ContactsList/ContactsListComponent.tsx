import React, { useEffect } from "react";
import { useContactsStore } from "../../store/global/contactsStore";
import { useGlobalStore } from "../../store/global/globalStore";
import { ContactsList } from "./ContactsList";

const ContactsListComponent: React.FC = () => {
  const { user } = useGlobalStore();
  const {
    contacts,
    selectedContacts,
    currentlyViewedContact,
    contactsListViewMode,
    contactsListViewModeHandler,
    addContactButtonClickHandler,
    selectAllClickHandler,
    deleteSelectedHandler,
    contactClickHandler,
    contactSelectHandler,
    getContacts,
  } = useContactsStore();

  useEffect(() => {
    getContacts(user!.id);
  }, []);

  return contacts ? (
    <ContactsList
      contacts={contacts}
      selectedContacts={selectedContacts}
      currentlyViewedContact={currentlyViewedContact}
      viewMode={contactsListViewMode}
      onSelectModeClicked={contactsListViewModeHandler}
      onAddClicked={addContactButtonClickHandler}
      onSelectAllClicked={selectAllClickHandler}
      onDeleteSelectedClicked={() => deleteSelectedHandler(user!.id)}
      onContactClicked={contactClickHandler}
      onContactSelected={contactSelectHandler}
    />
  ) : null;
};

export { ContactsListComponent };

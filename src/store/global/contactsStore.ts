import { useState } from "react";
import { createStore } from "reusable";
import { IBaseContact, IContact, IFormContact } from "../../models/contact.model";
import { httpService } from "../../service/http.service";

const useContactsStore = createStore(() => {
  const [contacts, setContacts] = useState<IContact[] | null>(null);
  const [currentlyViewedContact, setcurrentlyViewedContact] = useState<IContact | null>(null);
  const [selectedContacts, setselectedContacts] = useState<IContact[] | null>(null);
  const [contactsListViewMode, setcontactsListViewMode] = useState<"view" | "select">("view");
  const [contactDetailsViewMode, setcontactDetailsViewMode] = useState<"view" | "edit" | "add" | null>(
    null
  );

  const getAccessToken = () => JSON.parse(window.localStorage.getItem("token-step")!).accessToken;

  const getContacts = async (userId: number) => {
    // get access Token
    const accessToken = getAccessToken();
    const res = await httpService.get(`/api/v1/users/${userId}/contacts/list`, accessToken);
    if (res && res.data) {
      const contacts = res.data.data;
      setContacts(contacts);
    }
  };

  const contactsListViewModeHandler = () => {
    if (contactsListViewMode === "view"){
      setcontactsListViewMode("select");
    } else {
      setselectedContacts([]);
      setcontactsListViewMode("view");
    }

  };

  const addContactButtonClickHandler = () => {
    setcontactDetailsViewMode("add");
  };

  const selectAllClickHandler = () => {
    setselectedContacts([...contacts!]);
  };

  const deleteSelectedHandler = (user_id: number) => {
    deleteMultipleContacts(
      user_id,
      selectedContacts!.map((c) => c.id)
    );
  };

  const contactClickHandler = (contactId: number) => {
    setcurrentlyViewedContact(contacts!.find((c) => c.id === contactId)!);
    setcontactDetailsViewMode("view");
  };

  const contactSelectHandler = (contactId: number) => {
    let prevSelected = selectedContacts ? [...selectedContacts] : [];

    if (prevSelected.findIndex((s) => s.id === contactId) !== -1) {
      // contact selected previously
      prevSelected = prevSelected.filter((s) => s.id !== contactId);
    } else { // contact was unselected previously
      const contact = contacts!.find((c) => c.id === contactId)!;
      prevSelected.push(contact);
    }
    setselectedContacts(prevSelected);
  };


  const saveContactHandler = (userId: number, contactData: IFormContact) => {
    const data: IBaseContact = {
      name: contactData.name,
      phone: +contactData.phone
    };

    addContact(userId, data);
  }

  const cancelAddContactHandler = () => {
    setcurrentlyViewedContact(null);
    setcontactDetailsViewMode(null);
  }

  const cancelEditContactHandler = () => {
    setcontactDetailsViewMode("view");
  }

  const editContactHandler = () => {
    setcontactDetailsViewMode("edit");
  }


  
  const addContact = async (userId: number, newContact: IBaseContact) => {
    const accessToken = getAccessToken();
    const res = await httpService.post(
      `/api/v1/users/${userId}/contacts/add`,
      newContact,
      accessToken
    );

    if (res && res.status === 200) {
      
      await getContacts(userId); // re fetch the contacts
      setcurrentlyViewedContact(res.data.contact as IContact);
      setcontactDetailsViewMode("view");

    } else {
      console.log(res);
      console.log("Something went wrong");
    }
  };

  const deleteContact = async (userId: number, contactId: number) => {
    const accessToken = getAccessToken();
    const res = await httpService.delete(
      `/api/v1/users/${userId}/contacts/${contactId}/delete`,
      accessToken,
    );

    if (res && res.status === 200) {
      setcurrentlyViewedContact(null);
      setcontactDetailsViewMode(null)
      await getContacts(userId);
    } else {
      console.log("Something went wrong");
    }
  };

  const deleteMultipleContacts = async (userId: number, contactIds: number[]) => {
    const accessToken = getAccessToken();
    const data = {
      contact_ids: contactIds
    };

    const res = await httpService.delete(
      `/api/v1/users/${userId}/contacts/delete`,
      accessToken,
      data
    );

    if (res && res.status === 200) {
      if (currentlyViewedContact && contactIds.indexOf(currentlyViewedContact.id) !== -1) {
        setcurrentlyViewedContact(null);
      }

      const prevSelected = [...selectedContacts!];
      setselectedContacts(prevSelected.filter((c) => contactIds.indexOf(c.id) === -1));
      await getContacts(userId);
    } else {
      console.log("Something went wrong");
    }
  };

  const updateContact = async (userId: number, contactId: number, updContact: IFormContact) => {
    const accessToken = getAccessToken();
    const data: IBaseContact = {
      name: updContact.name,
      phone: +updContact.phone
    };

    const res = await httpService.put(
      `/api/v1/users/${userId}/contacts/${contactId}/edit`,
      data,
      accessToken
    );

    if (res && res.status === 200) {
      setcurrentlyViewedContact(res.data);
      setcontactDetailsViewMode("view");
      await getContacts(userId);
    }
  };

  return {
    contacts,
    currentlyViewedContact,
    selectedContacts,
    selectAllClickHandler,
    deleteSelectedHandler,
    contactsListViewMode,
    contactsListViewModeHandler,
    contactDetailsViewMode,
    addContactButtonClickHandler,
    contactClickHandler,
    contactSelectHandler,
    cancelAddContactHandler,
    cancelEditContactHandler,
    editContactHandler,

    saveContactHandler,
    getContacts,
    addContact,
    deleteContact,
    deleteMultipleContacts,
    updateContact
  };
});

export { useContactsStore };

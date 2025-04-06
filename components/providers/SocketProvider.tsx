"use client";

import { socket } from "@/lib/socket";
import { IChatContact, IChatHistory } from "@/types/chat.types";
import getProfilePicture from "@/utils/profilePicture.mapping";
import useAppStore from "@/utils/store";
import { ReactNode, useEffect } from "react";

function SocketProvider({ children }: { children: ReactNode }) {
  const setIsSocketConnected = useAppStore(
    (state) => state.setIsSocketConnected
  );
  const setContacts = useAppStore((state) => state.setContacts);
  const setSelectedContact = useAppStore((state) => state.setSelectContact);
  const setChatHistory = useAppStore((state) => state.setChatHistory);
  const contacts = useAppStore((state) => state.contacts);

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected successfully");
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsSocketConnected(false);
    }

    function onFetchContacts(contacts: Array<IChatContact>) {
      const parsedContacts: IChatContact[] = contacts.map((contact) => ({
        ...contact,
        profilePic: getProfilePicture(
          contact.profilePic as
            | "avatar-1"
            | "avatar-2"
            | "avatar-3"
            | "avatar-4"
            | "avatar-5"
            | "avatar-6"
            | "avatar-7"
        ),
      }));

      setContacts(parsedContacts);
      setSelectedContact(parsedContacts[0]);

      // Fetch chat history for first contact

      socket.emit("get_chat_history", {
        contactId: parsedContacts[0].contactId,
        limit: 20,
        page: 1,
      });
    }

    function onGetChatHistory(chatHistory: IChatHistory) {
      setChatHistory(chatHistory);
    }

    function onUpdateContact({
      contactId,
      timestamp,
      unreadCount,
      lastMessage,
    }: Pick<
      IChatContact,
      "contactId" | "timestamp" | "unreadCount" | "lastMessage"
    >) {
      // Get contact with contact id and update necessary data

      const newContacts = contacts.map((contact) => {
        if (contact.contactId === contactId) {
          return { ...contact, timestamp, unreadCount, lastMessage };
        }

        return contact;
      });

      setContacts(newContacts);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("fetch_contacts", onFetchContacts);
    socket.on("chat_history", onGetChatHistory);
    socket.on("update_contact", onUpdateContact);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("fetch_contacts", onFetchContacts);
      socket.off("chat_history", onGetChatHistory);
      socket.off("update_contact", onUpdateContact);
    };
  }, [
    setIsSocketConnected,
    setContacts,
    setSelectedContact,
    setChatHistory,
    contacts,
  ]);

  return <>{children}</>;
}

export default SocketProvider;

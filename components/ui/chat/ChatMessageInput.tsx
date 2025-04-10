"use client";

import { IChatHistory, IChatMessage } from "@/types/chat.types";
import useAppStore from "@/utils/store";
import updateContactPosition from "@/utils/updateContactPosition";
import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

function ChatMessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const {
    selectedContact,
    setChatHistory,
    chatHistory,
    contacts,
    setContacts,
    user,
    socket,
  } = useAppStore((state) => state);

  const currentUser = {
    _id: user?.id as string,
    username: user?.username as string,
    profilePic: user?.profilePic as string,
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    // Only send message when there is a selected contact and message length is greater than 1

    if (message.trim().length > 1 && selectedContact) {
      // Create temporary message object for immediate display

      const tempMessage: IChatMessage = {
        _id: `temp-${Date.now()}`,
        sender: currentUser,
        receiver: {
          _id: selectedContact.contactId,
          username: selectedContact.username,
          profilePic: selectedContact.profilePic as string,
        },
        message: message,
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      // Optimistically update UI

      const updatedChatHistory: IChatHistory = {
        ...chatHistory,
        totalCount: chatHistory.totalCount + 1,
        hasMore: chatHistory.hasMore || chatHistory.totalCount > 20,
        messages: [...chatHistory.messages, tempMessage],
      };

      setChatHistory(updatedChatHistory);

      socket?.current?.emit("send_message", {
        message,
        receiverId: selectedContact.contactId,
      });

      // Clear the input

      setMessage("");

      // Update contact position

      updateContactPosition(
        selectedContact?.contactId as string,
        message.trim(),
        tempMessage.createdAt,
        contacts,
        setContacts
      );
    }
  };

  return (
    <div className="sticky -bottom-2 left-0 w-full right-0 flex items-end rounded-2xl max-[655px]:relative max-[655px]:bottom-auto max-[655px]:right-auto max-[655px]:left-auto max-[655px]:overflow-hidden max-[655px]:rounded-none max-[655px]:gap-2">
      <textarea
        ref={textareaRef}
        name="chatMessage"
        id="chatMessage"
        rows={1}
        className="bg-primary overflow-hidden resize-none max-h-[100px] rounded-lg outline-none focus:border-blue-300 p-4 inline-block flex-1"
        value={message}
        onChange={handleChange}
      ></textarea>

      <button
        className="rounded-full p-3 max-[655px]: -rotate-45 cursor-pointer"
        onClick={handleSendMessage}
      >
        <AiOutlineSend className="text-2xl" />
      </button>
    </div>
  );
}

export default ChatMessageInput;

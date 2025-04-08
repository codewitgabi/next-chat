"use client";

import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import useAppStore from "@/utils/store";
import ChatBubble from "./chat/ChatBubble";
import ChatMessageInput from "./chat/ChatMessageInput";
import { IoChevronBackSharp } from "react-icons/io5";

interface MobileChatContentDrawerProps {
  open: boolean;
  setOpenMobileChatContent: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileChatContentDrawer({
  open,
  setOpenMobileChatContent,
}: MobileChatContentDrawerProps) {
  const selectedContact = useAppStore((state) => state.selectedContact);
  const setSelectedContact = useAppStore((state) => state.setSelectContact);
  const chatHistory = useAppStore((state) => state.chatHistory);

  const handleClose = () => {
    setOpenMobileChatContent(false);
    setSelectedContact(null);
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={setOpenMobileChatContent}
        className="drawer"
      >
        <div className="h-full flex flex-col bg-secondary max-w-full text-white">
          {/* Header */}

          <div className="p-4 flex items-center gap-4 border-b border-primary w-dvw">
            <button className="" onClick={handleClose}>
              <IoChevronBackSharp className="text-2xl" />
            </button>

            {selectedContact && (
              <Image
                src={selectedContact.profilePic as string}
                alt={`${selectedContact?.username}-profile-pic`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <h1 className="line-clamp-1">{selectedContact?.username}</h1>
          </div>

          {/* Chat section */}

          <div className="flex-1 relative overflow-y-auto">
            {/* Chat content */}

            <div className="bg-secondary max-[655px]:rounded-none rounded-xl p-4 grow overflow-y-auto relative flex flex-col">
              <div className="grow overflow-y-auto">
                {chatHistory.messages.length > 0 ? (
                  chatHistory.messages.map(
                    ({
                      _id,
                      createdAt,
                      sender: { _id: senderId },
                      message,
                    }) => (
                      <ChatBubble
                        key={_id}
                        message={message}
                        timestamp={createdAt}
                        type={
                          senderId === "67f126dac0b8fa775dc666dd"
                            ? "sender"
                            : "receiver"
                        }
                      />
                    )
                  )
                ) : (
                  <div className="text-center flex items-center justify-center">
                    <h2 className="">Start a new conversation</h2>
                  </div>
                )}
              </div>

              {/* Message input box */}
            </div>
          </div>

          {/* <ChatMessageInput /> */}

          <div className="border-t-secondary">
            <ChatMessageInput />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default MobileChatContentDrawer;

"use client";

import ContactProfileDetail from "../ui/chat/ContactProfileDetail";
import ChatContent from "../ui/chat/ChatContent";
import ChatContact from "../ui/chat/ChatContact";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

function ChatSection() {
  useEffect(() => {
    // Connect to socket

    socket.connect();

    console.log("Socket connected")
  }, []);

  return (
    <section className="grid grid-cols-4 gap-2 flex-1 overflow-hidden mt-4 max-[1200px]:grid-cols-3 max-[655px]:grid-cols-1">
      {/* Contact */}

      <ChatContact />

      {/* Chat */}

      <ChatContent />

      {/* Selected contact profile */}

      <ContactProfileDetail />
    </section>
  );
}

export default ChatSection;

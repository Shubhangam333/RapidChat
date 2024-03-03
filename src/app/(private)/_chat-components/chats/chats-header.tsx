"use client";
import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import NewChatModal from "./new-chat-modal";

function ChatsHeader() {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: "New Chat",
      key: "1",
      onClick: () => setShowNewChatModal(true),
    },
    { label: "New Group", key: "2" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-500 font-bold uppercase">My Chats</h1>

        <Dropdown.Button size="small" className="w-max" menu={{ items }}>
          New
        </Dropdown.Button>
      </div>

      <input
        type="text"
        placeholder="Search chats...."
        className="bg-gray-100 w-full border border-gray-300 rounded-md px-3 border-solid h-14 outline-none focus:border-primary focus:outline-none"
      />

      {showNewChatModal && (
        <NewChatModal
          setShowNewChatModal={setShowNewChatModal}
          showNewChatModal={showNewChatModal}
        />
      )}
    </div>
  );
}

export default ChatsHeader;

"use client";
import React from "react";
import Recipient from "./recipient";
import { ChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";

function ChatArea() {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className=" flex-1 flex flex-col justify-center items-center h-full">
        <img src="/chatlogo.webp" alt="" className=" h-60" />
        <span className="font-semibold text-gray-600 text-sm">
          Select a chat to start messaging
        </span>
      </div>
    );
  }
  return (
    selectedChat && (
      <div className="flex-1">
        <Recipient />
      </div>
    )
  );
}

export default ChatArea;

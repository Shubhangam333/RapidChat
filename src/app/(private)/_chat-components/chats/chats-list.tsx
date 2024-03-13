"use client";
import { ChatState, setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chat";
import { Spin, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";
import socket from "@/config/socket-config";
import { ChatType, MessageType } from "@/interfaces";
import store from "@/redux/store";

function ChatsList() {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const { chats }: ChatState = useSelector((state: any) => state.chat);
  const [loading, setLoading] = React.useState(false);

  const getChats = async () => {
    try {
      setLoading(true);
      const response = await GetAllChats(currentUserData?._id!);

      if (response.error) {
        throw new Error(response.error);
      }
      dispatch(setChats(response));
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserData) {
      getChats();
    }
  }, [currentUserData]);

  useEffect(() => {
    socket.on("new-message-received", (newMessage: MessageType) => {
      const { chats }: ChatState = store.getState().chat;
      let prevChats = [...chats];

      let indexOfChatToUpdate = prevChats.findIndex(
        (chat) => chat._id === newMessage.chat._id
      );
      if (indexOfChatToUpdate === -1) return;

      console.log("h");

      let chatToUpdate = prevChats[indexOfChatToUpdate];

      if (
        chatToUpdate.lastMessage?.socketMessageId === newMessage.socketMessageId
      )
        return;
      let chatToUpdateCopy: ChatType = { ...chatToUpdate };

      chatToUpdateCopy.lastMessage = newMessage;
      chatToUpdateCopy.updatedAt = newMessage.createdAt;
      chatToUpdateCopy.unreadCounts = { ...chatToUpdate.unreadCounts };

      if (
        newMessage.sender._id !== currentUserData?._id &&
        selectedChat?._id !== newMessage.chat._id
      ) {
        chatToUpdateCopy.unreadCounts[currentUserData?._id!] =
          (chatToUpdateCopy.unreadCounts[currentUserData?._id!] || 0) + 1;
      }

      prevChats[indexOfChatToUpdate] = chatToUpdateCopy;

      prevChats = [
        prevChats[indexOfChatToUpdate],
        ...prevChats.filter((chat) => chat._id !== newMessage.chat._id),
      ];
      dispatch(setChats(prevChats));
    });
  }, [selectedChat]);
  return (
    <div>
      {chats.length > 0 && (
        <div className="flex flex-col gap-5 mt-5">
          {chats.map((chat) => {
            return <ChatCard chat={chat} key={chat._id} />;
          })}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center mt-32">
          <div className="flex flex-col">
            <Spin />
            <span className="text-gray-500 text-sm my-5">Loading chats...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatsList;

"use client";
import { ChatState, setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chat";
import { Spin, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";

function ChatsList() {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
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

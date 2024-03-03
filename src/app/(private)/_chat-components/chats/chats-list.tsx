"use client";
import { setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chat";
import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatsList() {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
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
    getChats();
  }, [currentUserData]);
  return <div>ChatsList</div>;
}

export default ChatsList;

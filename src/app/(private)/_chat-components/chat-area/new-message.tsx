import socket from "@/config/socket-config";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { SendNewMessage } from "@/server-actions/messages";
import { Button, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function NewMessage() {
  const [text, setText] = useState("");
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const InputRef = useRef<HTMLInputElement>(null);
  const onSend = async () => {
    try {
      if (!text) return;

      const commonpayload = {
        text,
        image: "",
        socketMessageId: dayjs().unix(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      };

      const socketpayload = {
        ...commonpayload,
        sender: currentUserData,
        chat: selectedChat,
      };

      //send message using socket

      socket.emit("send-new-message", socketpayload);
      const dBpayload = {
        ...commonpayload,
        sender: currentUserData?._id!,
        chat: selectedChat?._id!,
      };
      await SendNewMessage(dBpayload);
      // if (response.error) throw new Error(response.error);
      setText("");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    socket.emit("typing", {
      chat: selectedChat,
      senderId: currentUserData?._id!,
    });
  }, [selectedChat, text]);
  return (
    <div className="p-3 bg-gray-100 border-t border-solid border-gray-300 flex gap-5">
      <div></div>
      <div className="flex-1">
        <input
          type="text"
          value={text}
          placeholder="Type a message"
          className="w-full border border-solid border-gray-300 focus:outline-none focus:border-gray-500 h-[45px] px-5"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          ref={InputRef}
        />
      </div>
      <Button type="primary" onClick={onSend}>
        SEND
      </Button>
    </div>
  );
}

export default NewMessage;

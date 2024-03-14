"use client";
import { MessageType } from "@/interfaces";
import { ChatState, setChats } from "@/redux/chatSlice";
import { GetChatMessages, ReadAllMessages } from "@/server-actions/messages";
import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./message";
import { UserState } from "@/redux/userSlice";
import socket from "@/config/socket-config";

function Messages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const { selectedChat, chats }: ChatState = useSelector(
    (state: any) => state.chat
  );
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();

  const messagesDivRef = useRef<HTMLDivElement>(null);

  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await GetChatMessages(selectedChat?._id!);
      if (response.error) throw new Error(response.error);
      console.log(response);
      setMessages(response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("new-message-received", (message: MessageType) => {
      if (selectedChat?._id === message.chat._id) {
        setMessages((prev) => {
          const isMessageAlreadyExists: any = prev.find(
            (msg) => msg.socketMessageId === message.socketMessageId
          );
          if (isMessageAlreadyExists) return prev;
          else return [...prev, message];
        });
      }
    });

    socket.on(
      "user-read-all-chat-messages",
      ({ chatId, readByUserId }: { chatId: string; readByUserId: string }) => {
        if (selectedChat?._id === chatId) {
          setMessages((prev) => {
            const newMessages = prev.map((msg) => {
              if (
                msg.sender._id !== readByUserId &&
                !msg.readBy.includes(readByUserId)
              ) {
                return { ...msg, readBy: [...msg.readBy, readByUserId] };
              }
              return msg;
            });
            return newMessages;
          });
        }
      }
    );
  }, [selectedChat]);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop =
        messagesDivRef.current.scrollHeight + 100;
    }

    let unreadMessages = 0;
    let chat = chats.find((chat) => chat._id === selectedChat?._id);

    if (chat) {
      unreadMessages = chat.unreadCounts[currentUserData?._id!] || 0;
    }

    if (unreadMessages > 0) {
      ReadAllMessages({
        userId: currentUserData?._id!,
        chatId: selectedChat?._id!,
      });

      socket.emit("read-all-messages", {
        chatId: selectedChat?._id!,
        readByUserId: currentUserData?._id!,
        users: selectedChat?.users
          .filter((user) => user._id !== currentUserData?._id!)
          .map((user) => user._id),
      });
    }

    //set the unread messages to 0 for the selected chat

    const newChats = chats.map((chat) => {
      if (chat._id === selectedChat?._id) {
        let chatData = { ...chat };
        chatData.unreadCounts = { ...chatData.unreadCounts };
        chatData.unreadCounts[currentUserData?._id!] = 0;
        return chatData;
      } else {
        return chat;
      }
    });

    dispatch(setChats(newChats));
  }, [messages]);
  return (
    <div className="flex-1 p-3 overflow-y-scroll" ref={messagesDivRef}>
      <div className="flex flex-col gap-3">
        {messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
      </div>
    </div>
  );
}

export default Messages;

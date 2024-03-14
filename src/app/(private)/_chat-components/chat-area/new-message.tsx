import socket from "@/config/socket-config";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { SendNewMessage } from "@/server-actions/messages";
import { Button, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import ImageSelector from "./image-selector";
import { UploadImageToFireBaseAndReturnURL } from "@/helpers/image-upload";

function NewMessage() {
  const [text, setText] = useState("");
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const InputRef = useRef<HTMLInputElement>(null);
  const onSend = async () => {
    try {
      if (!text && !selectedImageFile) return;
      setLoading(true);

      let image = "";

      if (selectedImageFile) {
        image = await UploadImageToFireBaseAndReturnURL(selectedImageFile);
      }
      const commonpayload = {
        text,
        image,
        socketMessageId: dayjs().unix(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        readBy: [],
      };

      const socketpayload = {
        ...commonpayload,
        sender: currentUserData,
        chat: selectedChat,
      };

      //send message using socket

      socket.emit("send-new-message", socketpayload);
      setText("");
      setSelectedImageFile(null);
      setShowImageSelector(false);
      setShowEmojiPicker(false);
      const dBpayload = {
        ...commonpayload,
        sender: currentUserData?._id!,
        chat: selectedChat?._id!,
      };
      await SendNewMessage(dBpayload);
      // if (response.error) throw new Error(response.error);
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.emit("typing", {
      chat: selectedChat,
      senderId: currentUserData?._id!,
      senderName: currentUserData?.name.split(" ")[0]!,
    });
  }, [selectedChat, text]);
  return (
    <div className="p-3 bg-gray-100 border-t relative border-solid border-gray-300 flex gap-5">
      <div className="flex gap-5">
        {showEmojiPicker && (
          <div className="absolute left-5 bottom-20">
            <EmojiPicker
              height={350}
              onEmojiClick={(emojiObject: any) => {
                setText((prevText) => prevText + emojiObject.emoji);
                InputRef.current?.focus();
              }}
            />
          </div>
        )}
        <Button
          className="border-gray-300"
          onClick={() => setShowImageSelector(!showImageSelector)}
        >
          <i className="ri-folder-image-line"></i>
        </Button>
        <Button
          className="border-gray-300"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {!showEmojiPicker ? (
            <i className="ri-emoji-sticker-line"></i>
          ) : (
            <i className="ri-keyboard-line"></i>
          )}
        </Button>
      </div>
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

      {showImageSelector && (
        <ImageSelector
          setShowImageSelector={setShowImageSelector}
          showImageSelector={showImageSelector}
          selectedImageFile={selectedImageFile}
          setSelectedImageFile={setSelectedImageFile}
          onSend={onSend}
          loading={loading}
        />
      )}
    </div>
  );
}

export default NewMessage;

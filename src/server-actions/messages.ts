"use server";

import ChatModel from "@/models/chat-model";
import MessageModel from "@/models/message-model";

export const SendNewMessage = async (payload: {
  text?: string;
  image?: string;
  chat: string;
  sender: string;
}) => {
  try {
    const newmessage = new MessageModel(payload);
    await newmessage.save();
    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newmessage._id,
    });
    return { message: "Message sent successfully." };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetChatMessages = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender")
      .sort({ createdAt: 1 });
    return JSON.parse(JSON.stringify(messages));
  } catch (error: any) {
    return { error: error.message };
  }
};

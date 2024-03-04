import { ChatType } from "@/interfaces";
import { ChatState, setSelectedChat } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatCard({ chat }: { chat: ChatType }) {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";
  let lastMessage = "";
  let lastMessageSenderName = "";
  let lastMessageTime = "";

  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatImage = chat.groupProfilePicture;
  } else {
    const recipient = chat.users.find(
      (user) => user._id === currentUserData?._id
    );
    chatName = recipient?.name!;
    chatImage = recipient?.profilePicture!;
  }

  const isSelected = selectedChat?._id === chat?._id;
  return (
    <div
      className={`flex justify-between hover:bg-gray-200 py-3 px-2 rounded cursor-pointer ${
        isSelected ? "bg-gray-200 border border-gray-200 border-solid" : ""
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex gap-5">
        <img
          src={chatImage}
          alt={chatName}
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>

      <div>
        <span>{lastMessageTime}</span>
      </div>
    </div>
  );
}

export default ChatCard;

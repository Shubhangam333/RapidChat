import { ChatType } from "@/interfaces";
import { UserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";

function ChatCard({ chat }: { chat: ChatType }) {
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

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
  return (
    <div className="flex justify-between">
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
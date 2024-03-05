import { ChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";

function Recipient() {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat.groupName;
    chatImage = selectedChat.groupProfilePicture;
  } else {
    const recipient = selectedChat?.users.find(
      (user) => user._id !== selectedChat?._id
    );
    chatName = recipient?.name!;
    chatImage = recipient?.profilePicture!;
  }
  return (
    <div className="flex justify-between py-3 border-0 px-5 border-b border-gray-200 border-solid bg-gray-400/5">
      <div className="flex gap-5">
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <span className="text-gray-700 text-sm">{chatName}</span>
      </div>
    </div>
  );
}

export default Recipient;

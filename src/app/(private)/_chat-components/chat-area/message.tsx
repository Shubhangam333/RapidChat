import { formatDateTime } from "@/helpers/date-format";
import { MessageType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

function Message({ message }: { message: MessageType }) {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const isLoggedInUserMessage = message.sender._id === currentUserData?._id;

  if (isLoggedInUserMessage) {
    return (
      <div className="flex justify-end gap-2">
        <div className="flex flex-col gap-0">
          <p className="bg-primary text-white py-1 px-7 rounded-xl rounded-tl-none m-0">
            {message.text}
          </p>
          <span className="text-gray-500 text-xs">
            {formatDateTime(message.createdAt)}
          </span>
        </div>
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div className="flex  gap-2">
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-200 py-2 px-7 rounded-xl rounded-tr-none">
            <span className="text-blue-500 text-xs font-semibold">
              {message.sender.name}
            </span>
            <p className=" text-black   m-0 pt-1">{message.text}</p>
          </div>
          <span className="text-gray-500 text-xs">
            {formatDateTime(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;

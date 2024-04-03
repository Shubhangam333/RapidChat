export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  userName: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  readBy: UserType[];
}

export interface ChatType {
  _id: string;
  users: UserType[];
  createdBy: UserType;
  lastMessage: MessageType;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  groupBio: string;
  groupAdmins: UserType[];
  unreadCounts: any;
  createdAt: string;
  updatedAt: string;
}

export interface MessageType {
  _id: string;
  socketMessageId: string;
  chat: ChatType;
  sender: UserType;
  text: string;
  image: string;
  readBy: UserType[];
  createdAt: string;
  updatedAt: string;
}

"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { UserState, setCurrentUser, setOnlineUsers } from "@/redux/userSlice";
import socket from "@/config/socket-config";

function Header() {
  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  if (isPublicRoute) return null;
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  // const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.error) {
        throw new Error(response.error);
      }
      dispatch(setCurrentUser(response as UserType));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserData) {
      socket.emit("join", currentUserData._id);
    }

    socket.on("online-users-updated", (onlineUsers: string[]) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [currentUserData]);

  return (
    currentUserData && (
      <div className="bg-gray-200 px-5 py-2 w-full flex justify-between items-center border-b border-solid border-gray-300">
        <div>
          <h1 className="text-2xl font-semibold text-primary uppercase">
            Rapid Chat
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-sm">{currentUserData?.name}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => setShowCurrentUserInfo(true)}
            src={currentUserData?.profilePicture}
          />
        </div>
        {showCurrentUserInfo && (
          <CurrentUserInfo
            setShowCurrentUserInfo={setShowCurrentUserInfo}
            showCurrentUserInfo={showCurrentUserInfo}
          />
        )}
      </div>
    )
  );
}

export default Header;

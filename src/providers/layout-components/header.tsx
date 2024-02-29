"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  if (isPublicRoute) return null;
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.error) {
        throw new Error(response.error);
      }
      setCurrentUser(response);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    currentUser && (
      <div className="bg-gray-200 px-5 py-2 w-full flex justify-between items-center border-b border-solid border-gray-300">
        <div>
          <h1 className="text-2xl font-semibold text-primary uppercase">
            Rapid Chat
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-sm">{currentUser?.name}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => setShowCurrentUserInfo(true)}
            src={currentUser?.profilePicture}
          />
        </div>
        {showCurrentUserInfo && (
          <CurrentUserInfo
            currentUser={currentUser}
            setShowCurrentUserInfo={setShowCurrentUserInfo}
            showCurrentUserInfo={showCurrentUserInfo}
          />
        )}
      </div>
    )
  );
}

export default Header;

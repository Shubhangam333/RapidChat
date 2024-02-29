import { UserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CurrentUserInfo({
  currentUser,
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  currentUser: UserType | null;
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("Logged Out Successfully");
      router.push("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="Profile"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          <img
            src={currentUser?.profilePicture}
            alt="profile"
            className="w-28 h-28 rounded-full"
          />
          <span className="text-gray-500 cursor-pointer">
            Change Profile Picture
          </span>
        </div>
        <Divider className="my-1 border-gray-200" />
        <div className="flex flex-col gap-5">
          {getProperty("Name", currentUser.name)}
          {getProperty("UserName", currentUser.userName)}
          {getProperty("Id", currentUser._id)}
          {getProperty(
            "Joined On",
            dayjs(currentUser.createdAt).format("DD MMM YYYY hh:mm A")
          )}
        </div>
        <div className="mt-5">
          <Button className="w-full" block onClick={onLogout} loading={loading}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default CurrentUserInfo;

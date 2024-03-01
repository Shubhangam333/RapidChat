import { UploadImageToFireBaseAndReturnURL } from "@/helpers/image-upload";
import { UserType } from "@/interfaces";
import { UserState, setCurrentUser } from "@/redux/userSlice";
import { UpdateUserProfile } from "@/server-actions/users";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, Upload, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CurrentUserInfo({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { signOut } = useClerk();
  const router = useRouter();
  const dispatch = useDispatch();
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

  const onProfilePictureUpdate = async () => {
    try {
      setLoading(true);
      const url: string = await UploadImageToFireBaseAndReturnURL(
        selectedFile!
      );
      const response = await UpdateUserProfile(currentUserData?._id!, {
        profilePicture: url,
      });
      if (response.error) throw new Error(response.error);
      dispatch(setCurrentUser(response));
      message.success("Profile Picture Updated Successfully.");
      setShowCurrentUserInfo(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="Profile"
    >
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center">
            {!selectedFile && (
              <img
                src={currentUserData?.profilePicture}
                alt="profile"
                className="w-28 h-28 rounded-full"
              />
            )}
            <Upload
              beforeUpload={(file) => {
                setSelectedFile(file);
                return false;
              }}
              className="cursor-pointer"
              listType={selectedFile ? "picture-circle" : "text"}
              maxCount={1}
            >
              Change Profile Picture
            </Upload>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData.name)}
            {getProperty("UserName", currentUserData.userName)}
            {getProperty("Id", currentUserData._id)}
            {getProperty(
              "Joined On",
              dayjs(currentUserData.createdAt).format("DD MMM YYYY hh:mm A")
            )}
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <Button
              className="w-full"
              block
              loading={loading}
              onClick={onProfilePictureUpdate}
              disabled={!selectedFile}
            >
              Update Profile Picture
            </Button>
            <Button
              className="w-full"
              block
              loading={loading && !selectedFile}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default CurrentUserInfo;

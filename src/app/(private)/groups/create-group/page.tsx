import UserModel from "@/models/user-model";
import Link from "next/link";
import GroupForm from "../_components/group-form";
import { UserType } from "@/interfaces";

async function CreateGroupPage() {
  const users: UserType[] = await UserModel.find({});
  return (
    <div className="p-5">
      <Link
        href="/"
        className="text-primary border border-primary px-5 py-2 no-underline border-solid text-sm"
      >
        Back to Chats
      </Link>
      <h1 className="text-primary text-xl font-bold py-2 uppercase">
        CreateGroupPage
      </h1>

      <GroupForm users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}

export default CreateGroupPage;

import { connectDB } from "@/config/db-config";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await GetCurrentUserFromMongoDB();

  connectDB();
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col gap-3">
        <span> Name : {user?.name}</span>
        <span>UserName : {user?.userName}</span>
        <span>Email : {user.email}</span>
      </div>
    </div>
  );
}

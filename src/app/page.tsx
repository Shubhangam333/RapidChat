import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  console.log("u", user);
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col gap-3">
        <span>First Name :</span>
        <span>Last Name :</span>
        <span>Username :</span>
        <span>Email :</span>
      </div>
    </div>
  );
}

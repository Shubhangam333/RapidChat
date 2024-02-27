import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}

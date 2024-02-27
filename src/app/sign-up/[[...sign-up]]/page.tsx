import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
}

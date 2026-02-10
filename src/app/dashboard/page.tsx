import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  console.log("Session:", session);

  return <div>Dashboard</div>;
};

export default Page;

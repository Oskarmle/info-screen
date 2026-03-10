"use client";
import { signOut } from "next-auth/react";
import { handleSignOutAction } from "../utils/handleLogOut";
import { Button } from "./ui/button";

const LogOutButton = () => {
  const handleSignOut = async () => {
    await handleSignOutAction();
    await signOut();
  };
  return (
    <Button
      variant="destructive"
      className="w-full mt-4"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  );
};

export default LogOutButton;

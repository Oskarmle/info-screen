"use client";

import { LogOut, Moon, Sun, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import { signOut } from "next-auth/react";

type NavBarProps = {
  session?: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } | null;
  };
};

const NavBar = ({ session }: NavBarProps) => {
  const { setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="p-4 flex w-full items-center justify-between bg-background rounded-t-2xl">
      {/* collapseButton */}
      <SidebarTrigger />
      <div className="flex items-center justify-end gap-6 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>CN</AvatarFallback>
              <span className="sr-only">User settings</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Users />
                Team
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;

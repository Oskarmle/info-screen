"use client";

import { LogOut, Moon, Sun, User, Users } from "lucide-react";
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
import { handleSignOutAction } from "../utils/handleLogOut";
import type { Locale } from "@/src/i18n/config";
import { messages } from "@/src/i18n/messages";
import LocaleSwitcher from "./LocaleSwitcher";

type NavBarProps = {
  locale: Locale;
  session?: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } | null;
  };
};

const NavBar = ({ locale, session }: NavBarProps) => {
  const t = messages[locale].navbar;
  const { setTheme } = useTheme();

  const handleSignOut = async () => {
    await handleSignOutAction();
    await signOut();
  };

  return (
    <nav className="p-4 flex h-18 w-full items-center justify-between bg-background rounded-t-2xl">
      {/* collapseButton */}
      <SidebarTrigger />
      <div className="flex items-center justify-end gap-6 w-full">
        <LocaleSwitcher locale={locale} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">{t.toggleTheme}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {t.light}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {t.dark}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {t.system}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>CN</AvatarFallback>
              <span className="sr-only">{t.userSettings}</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuItem>
                <User />
                {t.profile}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users />
                {t.team}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                <LogOut />
                {t.logOut}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;

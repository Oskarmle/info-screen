import {
  Calendar,
  CirclePlus,
  Home,
  List,
  Pencil,
  Search,
  Settings,
  Tv,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getSelectedOrganization } from "@/lib/organizationActions";
import OrganizationSwitcher from "./OrganizationSwitcher";

const DefaultItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Calender",
    href: "/dashboard/calender",
    icon: <Calendar />,
  },
  {
    title: "Search",
    href: "/dashboard/search",
    icon: <Search />,
  },
];

const infoScreens = [
  {
    title: "Create new info screen",
    href: "/dashboard/create-new-infoscreen",
    icon: <CirclePlus />,
  },
  {
    title: "See all info screens",
    href: "/dashboard/see-all-infoscreens",
    icon: <List />,
  },
  {
    title: "Edit existing info screens",
    href: "#",
    icon: <Pencil />,
    infoScreens: [
      {
        title: "Info Screen 1",
        href: "/dashboard/see-all-infoscreens/1",
        icon: <Tv />,
      },
      {
        title: "Info Screen 2",
        href: "/dashboard/see-all-infoscreens/1",
        icon: <Tv />,
      },
      {
        title: "Info Screen 3",
        href: "/dashboard/see-all-infoscreens/1",
        icon: <Tv />,
      },
      {
        title: "Info Screen 4",
        href: "/dashboard/see-all-infoscreens/1",
        icon: <Tv />,
      },
    ],
  },
];

const infoScreensContent = [
  {
    title: "Create new",
    href: "/dashboard/create-new-content",
    icon: <CirclePlus />,
  },
  {
    title: "See all content",
    href: "/dashboard/see-all-content",
    icon: <List />,
  },
];

const DashboardSidebar = async () => {
  const session = await auth();
  const memberships = await prisma.userOrganization.findMany({
    where: { userId: session?.user?.id },
    include: { organization: true },
  });
  const savedOrganizationId = await getSelectedOrganization();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <OrganizationSwitcher
          key={"organization-switcher"}
          organizations={memberships}
          defaultOrganization={savedOrganizationId}
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Info Screens</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoScreens.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.infoScreens?.some(
                    (subItem) => subItem.title === "Info Screen 1",
                  )}
                >
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          {item.icon} {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.infoScreens?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.infoScreens.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.href}>
                                  {subItem.icon} {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoScreensContent.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon} {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {DefaultItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        {item.icon} {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

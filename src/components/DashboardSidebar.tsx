import {
  Building2,
  CirclePlus,
  List,
  Pencil,
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
import { cookies } from "next/headers";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";

const DefaultItems = [
  {
    title: "Organizations",
    href: "/dashboard/organization/choose",
    icon: <Building2 />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
];

const InfoScreenPages = [
  {
    title: "Create new info screen",
    href: "/dashboard/info-screen/create",
    icon: <CirclePlus />,
  },
  {
    title: "See all info screens",
    href: "/dashboard/info-screen/see-all",
    icon: <List />,
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
  const cookieStore = await cookies();
  const memberships = await prisma.userOrganization.findMany({
    where: { userId: session?.user?.id },
    include: { organization: true },
  });
  const savedOrganizationId = await getSelectedOrganization();

  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const infoScreens = await fetchAllInfoScreenForOrganization(
    selectedOrganizationId ?? "",
  );

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
              {InfoScreenPages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon} {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {infoScreens.data && infoScreens.data.length > 0 && (
                <Collapsible defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Pencil /> Edit existing info screens
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {infoScreens.data.map((screen) => (
                          <SidebarMenuSubItem key={screen.id}>
                            <SidebarMenuSubButton asChild>
                              <Link href={`/info-screen/${screen.id}`}>
                                <Tv /> {screen.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
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

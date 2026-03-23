import {
  Building,
  Building2,
  CirclePlus,
  Edit,
  Handshake,
  House,
  Pencil,
  Presentation,
  Rows3,
  Settings,
  Users,
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
import {
  fetchOrganizationForOneUser,
  getSelectedOrganization,
} from "@/lib/organizationActions";
import OrganizationSwitcher from "./OrganizationSwitcher";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";

const generalPages = [
  {
    title: "Manage organization",
    href: "/dashboard/management/organization",
    icon: <Building />,
  },
  {
    title: "Users",
    href: "/dashboard/management/users",
    icon: <Users />,
  },
];

const FooterPages = [
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
    icon: <Rows3 />,
  },
];

const infoScreensContent = [
  {
    title: "Create new content",
    href: "/dashboard/content/create",
    icon: <CirclePlus />,
  },
  {
    title: "See all content",
    href: "/dashboard/content/see-all",
    icon: <Rows3 />,
  },
  {
    title: "Edit contents",
    href: "/dashboard/content/edit",
    icon: <Edit />,
  },
];

const SponsorsContent = [
  {
    title: "Manage sponsors",
    href: "/dashboard/sponsors/create",
    icon: <Handshake />,
  },
];



const DashboardSidebar = async () => {
  const session = await auth();
  const userOrganizationsResult = await fetchOrganizationForOneUser(
    session?.user?.id || "",
  );
  const savedOrganizationId = await getSelectedOrganization();

  const infoScreens = await fetchAllInfoScreenForOrganization(
    savedOrganizationId ?? "",
  );

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <OrganizationSwitcher
          key={"organization-switcher"}
          organizations={
            userOrganizationsResult.success
              ? userOrganizationsResult.data || []
              : []
          }
          defaultOrganization={savedOrganizationId}
        />
      </SidebarHeader>
      {/* <SidebarSeparator /> */}
      <SidebarGroup>
        <SidebarGroupLabel>Home</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <House /> Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalPages.map((item) => (
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
        <SidebarSeparator />
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
                              <Link
                                href={`/dashboard/info-screen/edit/${screen.id}`}
                              >
                                <Presentation /> {screen.title}
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
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Sponsors</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SponsorsContent.map((item) => (
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
                {FooterPages.map((item) => (
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

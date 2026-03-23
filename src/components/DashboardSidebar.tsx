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
import { messages } from "@/src/i18n/messages";
import type { Locale } from "@/src/i18n/config";

const withLocale = (locale: Locale, href: string) => `/${locale}${href}`;

const buildGeneralPages = (locale: Locale) => {
  const t = messages[locale].sidebar;
  return [
    {
      title: t.manageOrganization,
      href: withLocale(locale, "/dashboard/management/organization"),
      icon: <Building />,
    },
    {
      title: t.users,
      href: withLocale(locale, "/dashboard/management/users"),
      icon: <Users />,
    },
  ];
};

const buildFooterPages = (locale: Locale) => {
  const t = messages[locale].sidebar;
  return [
    {
      title: t.organizations,
      href: withLocale(locale, "/dashboard/organization/choose"),
      icon: <Building2 />,
    },
    {
      title: t.settings,
      href: withLocale(locale, "/dashboard/settings"),
      icon: <Settings />,
    },
  ];
};

const buildInfoScreenPages = (locale: Locale) => {
  const t = messages[locale].sidebar;
  return [
    {
      title: t.createInfoScreen,
      href: withLocale(locale, "/dashboard/info-screen/create"),
      icon: <CirclePlus />,
    },
    {
      title: t.seeAllInfoScreens,
      href: withLocale(locale, "/dashboard/info-screen/see-all"),
      icon: <Rows3 />,
    },
  ];
};

const buildInfoScreensContent = (locale: Locale) => {
  const t = messages[locale].sidebar;
  return [
    {
      title: t.createContent,
      href: withLocale(locale, "/dashboard/content/create"),
      icon: <CirclePlus />,
    },
    {
      title: t.seeAllContent,
      href: withLocale(locale, "/dashboard/content/see-all"),
      icon: <Rows3 />,
    },
    {
      title: t.editContents,
      href: withLocale(locale, "/dashboard/content/edit"),
      icon: <Edit />,
    },
  ];
};

const buildSponsorsContent = (locale: Locale) => {
  const t = messages[locale].sidebar;
  return [
    {
      title: t.manageSponsors,
      href: withLocale(locale, "/dashboard/sponsors/create"),
      icon: <Handshake />,
    },
  ];
};
const DashboardSidebar = async ({ locale }: { locale: Locale }) => {
  const t = messages[locale].sidebar;
  const generalPages = buildGeneralPages(locale);
  const FooterPages = buildFooterPages(locale);
  const InfoScreenPages = buildInfoScreenPages(locale);
  const infoScreensContent = buildInfoScreensContent(locale);
  const SponsorsContent = buildSponsorsContent(locale);

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
        <SidebarGroupLabel>{t.homeLabel}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={withLocale(locale, "/dashboard")}>
                <House /> {t.dashboard}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.management}</SidebarGroupLabel>
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
          <SidebarGroupLabel>{t.infoScreens}</SidebarGroupLabel>
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
                        <Pencil /> {t.editExistingInfoScreens}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {infoScreens.data.map((screen) => (
                          <SidebarMenuSubItem key={screen.id}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={withLocale(
                                  locale,
                                  `/dashboard/info-screen/edit/${screen.id}`,
                                )}
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
          <SidebarGroupLabel>{t.content}</SidebarGroupLabel>
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
          <SidebarGroupLabel>{t.sponsors}</SidebarGroupLabel>
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

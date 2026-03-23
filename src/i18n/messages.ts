import type { Locale } from "./config";

type SidebarMessages = {
  homeLabel: string;
  dashboard: string;
  management: string;
  infoScreens: string;
  content: string;
  sponsors: string;
  editExistingInfoScreens: string;
  manageOrganization: string;
  users: string;
  organizations: string;
  settings: string;
  createInfoScreen: string;
  seeAllInfoScreens: string;
  createContent: string;
  seeAllContent: string;
  editContents: string;
  manageSponsors: string;
};

type NavbarMessages = {
  toggleTheme: string;
  light: string;
  dark: string;
  system: string;
  profile: string;
  team: string;
  logOut: string;
  userSettings: string;
};

type LocaleMessages = {
  sidebar: SidebarMessages;
  navbar: NavbarMessages;
};

export const messages: Record<Locale, LocaleMessages> = {
  en: {
    sidebar: {
      homeLabel: "Home",
      dashboard: "Dashboard",
      management: "Management",
      infoScreens: "Info Screens",
      content: "Content",
      sponsors: "Sponsors",
      editExistingInfoScreens: "Edit info screens",
      manageOrganization: "Manage organization",
      users: "Users",
      organizations: "Organizations",
      settings: "Settings",
      createInfoScreen: "Create new info screen",
      seeAllInfoScreens: "See all info screens",
      createContent: "Create new content",
      seeAllContent: "See all content",
      editContents: "Edit contents",
      manageSponsors: "Manage sponsors",
    },
    navbar: {
      toggleTheme: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      profile: "Profile",
      team: "Team",
      logOut: "Log out",
      userSettings: "User settings",
    },
  },
  da: {
    sidebar: {
      homeLabel: "Hjem",
      dashboard: "Kontrolpanel",
      management: "Administration",
      infoScreens: "infoskærme",
      content: "Indhold",
      sponsors: "Sponsorer",
      editExistingInfoScreens: "Rediger infoskærme",
      manageOrganization: "Administrer organisation",
      users: "Brugere",
      organizations: "Organisationer",
      settings: "Indstillinger",
      createInfoScreen: "Opret ny infoskærm",
      seeAllInfoScreens: "Se alle infoskærme",
      createContent: "Opret nyt indhold",
      seeAllContent: "Se alt indhold",
      editContents: "Rediger indhold",
      manageSponsors: "Administrer sponsorer",
    },
    navbar: {
      toggleTheme: "Skift tema",
      light: "Lys",
      dark: "Mørk",
      system: "System",
      profile: "Profil",
      team: "Team",
      logOut: "Log ud",
      userSettings: "Brugerindstillinger",
    },
  },
};

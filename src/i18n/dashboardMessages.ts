import type { Locale } from "./config";

type DashboardMessages = {
  home: {
    cards: Array<{
      name: string;
      description: string;
      href: string;
      button: string;
    }>;
    activeTitle: string;
    activeDescription: string;
    seeAllButton: string;
  };
  infoScreenCreate: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionHelp: string;
    colourLabel: string;
    colourHelp: string;
    submit: string;
    cancel: string;
  };
  infoScreenSeeAll: {
    title: string;
    description: string;
    createButton: string;
  };
  infoScreenEdit: {
    title: string;
    notFound: string;
  };
  contentCreate: {
    title: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    nameHelp: string;
    titleLabel: string;
    titlePlaceholder: string;
    titleHelp: string;
    textLabel: string;
    textPlaceholder: string;
    imageLabel: string;
    imageHelp: string;
    contactSectionTitle: string;
    contactEmailLabel: string;
    contactEmailPlaceholder: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    contactHelp: string;
    submit: string;
    cancel: string;
  };
  contentSeeAll: {
    title: string;
    description: string;
  };
  contentEdit: {
    title: string;
  };
  sponsorsCreate: {
    title: string;
    formLegend: string;
    formDescription: string;
    sponsorNameLabel: string;
    sponsorNamePlaceholder: string;
    sponsorImageLabel: string;
    submit: string;
  };
  organizationChoose: {
    title: string;
    description: string;
    createButton: string;
    placeholders: {
      organizationName: string;
      street: string;
      postalCode: string;
      city: string;
      cvrNumber: string;
      logoUrl: string;
    };
  };
  management: {
    title: string;
    organization: string;
    users: string;
  };
  components: {
    infoScreenCard: {
      linkLabel: string;
      colourLabel: string;
      openButton: string;
      copyButton: string;
      editButton: string;
      deleteButton: string;
      copiedToast: string;
    };
    contentCard: {
      noImage: string;
      imageAlt: string;
      contactInfo: string;
      noContactInfo: string;
      deleteButton: string;
      editButton: string;
    };
    organizationCard: {
      description: string;
      body: string;
      requestButton: string;
      successToast: string;
      errorToast: string;
    };
    sponsorCard: {
      noImage: string;
      logoAlt: string;
      deleteButton: string;
    };
    editInfoScreenForm: {
      titleLabel: string;
      titlePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      colourLabel: string;
      submit: string;
      cancel: string;
      successToast: string;
      errorToast: string;
    };
    contentDragDrop: {
      allContent: string;
      activeContent: string;
      help: string;
      saveButton: string;
      successToast: string;
      errorToast: string;
    };
  };
};

export const dashboardMessages: Record<Locale, DashboardMessages> = {
  en: {
    home: {
      cards: [
        {
          name: "Info screen",
          description: "Create a new info screen for your organization",
          href: "/dashboard/info-screen/create",
          button: "Create info screen",
        },
        {
          name: "Content",
          description: "Create content that you later can add to a info screen",
          href: "/dashboard/content/create",
          button: "Create content",
        },
        {
          name: "Management",
          description: "Manage users and their access to the info screens",
          href: "/dashboard/management/users",
          button: "Manage users",
        },
      ],
      activeTitle: 'Active info screens "NOT IMPLEMENTED"',
      activeDescription:
        "Here you can see the info screens that are active and being shown on the displays. You can click on them to see more details and manage them.",
      seeAllButton: "See all info screens",
    },
    infoScreenCreate: {
      title: "Create a new info screen",
      nameLabel: "Give a name to your info screen",
      namePlaceholder: "Title",
      descriptionLabel: "Description of the info screen",
      descriptionPlaceholder: "Description",
      descriptionHelp:
        "Describe your info screen and its purpose. This will help you and your team to identify it later.",
      colourLabel: "Colour",
      colourHelp:
        "Choose the main colour for your info screen. This will be used as the background colour and accent colour for your info screen. You can always change it later.",
      submit: "Submit",
      cancel: "Cancel",
    },
    infoScreenSeeAll: {
      title: "This is all the info screens",
      description:
        "This list shows all the info screens that have been created for this organization. You can get a link to share the info screen or delete it if you no longer need it.",
      createButton: "Create a info screen",
    },
    infoScreenEdit: {
      title: "Edit your info screen",
      notFound: "Info screen not found",
    },
    contentCreate: {
      title: "Create new content",
      intro:
        "You can create content for your info-screen here. You also have the option to add it to an info-screen after you save it. You can always edit/delete the content later.",
      nameLabel: "Give a name to your content",
      namePlaceholder: "Name",
      nameHelp:
        "This will help you find it later when you want to add it to an info screen. It will not be used as the title for your info screen.",
      titleLabel: "Give your content a title",
      titlePlaceholder: "Title",
      titleHelp:
        "This will be shown on the info-screen for this piece of content.",
      textLabel: "The main text for your content",
      textPlaceholder: "Write the main text for your content here",
      imageLabel: "Add an image (optional)",
      imageHelp: "Select a image to upload. This is optional.",
      contactSectionTitle: "Add contact information (optional)",
      contactEmailLabel: "Contact email",
      contactEmailPlaceholder: "E-mail",
      contactNameLabel: "Contact name",
      contactNamePlaceholder: "First and last name",
      contactHelp:
        'If you want to add contact information for this content, you can add it here. This is optional. It will be shown as "For more information, contact FirstName LastName on email@email.com" on the info-screen.',
      submit: "Create content",
      cancel: "Cancel",
    },
    contentSeeAll: {
      title: "This is all the content",
      description:
        "This list shows all the content that have been created for this organization. You can not delete content that is active on an info screen, but you can delete content that is not active on any info screen.",
    },
    contentEdit: {
      title: "Edit content",
    },
    sponsorsCreate: {
      title: "Sponsor Dashboard",
      formLegend: "Add a new sponsor",
      formDescription:
        "You can add your sponsors and then place them on different info screens.",
      sponsorNameLabel: "Add the sponsors name",
      sponsorNamePlaceholder: "Sponsor name",
      sponsorImageLabel: "Add an image",
      submit: "Add sponsor",
    },
    organizationChoose: {
      title: "Organization Dashboard",
      description:
        "Create your own organization or choose to request membership in an existing one.",
      createButton: "Create Organization",
      placeholders: {
        organizationName: "Organization Name",
        street: "Street",
        postalCode: "Postal Code",
        city: "City",
        cvrNumber: "CVR Number",
        logoUrl: "Logo URL",
      },
    },
    management: {
      title: "Management",
      organization: "Organization management",
      users: "User management",
    },
    components: {
      infoScreenCard: {
        linkLabel: "The link to the info screen is:",
        colourLabel: "The color of the info-screen",
        openButton: "Go to info-screen",
        copyButton: "Copy link",
        editButton: "Edit",
        deleteButton: "Delete",
        copiedToast: "Link copied to clipboard",
      },
      contentCard: {
        noImage: "No image",
        imageAlt: "Content image",
        contactInfo: "Contact information",
        noContactInfo: "No contact information added for this content",
        deleteButton: "Delete content",
        editButton: "Edit content",
      },
      organizationCard: {
        description: "Some description about the organization.",
        body: "If you wish to join this organization, please click the button below to request membership.",
        requestButton: "Request Membership",
        successToast: "Your request has been sent",
        errorToast: "Failed to request membership, try again later",
      },
      sponsorCard: {
        noImage: "No image",
        logoAlt: "Sponsor logo",
        deleteButton: "Delete sponsor",
      },
      editInfoScreenForm: {
        titleLabel: "Title",
        titlePlaceholder: "Title",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Description",
        colourLabel: "Colour",
        submit: "Submit",
        cancel: "Cancel",
        successToast: "Your info-screen has been updated",
        errorToast: "Failed to update info-screen",
      },
      contentDragDrop: {
        allContent: "All content",
        activeContent: "Active content",
        help: "Add or remove content from the info-screen. Remember to save before closing the page.",
        saveButton: "Save content to info screen",
        successToast: "Content is saved to info screen",
        errorToast: "Something went wrong",
      },
    },
  },
  da: {
    home: {
      cards: [
        {
          name: "Infoskærm",
          description: "Opret en ny infoskærm til din organisation",
          href: "/dashboard/info-screen/create",
          button: "Opret infoskærm",
        },
        {
          name: "Indhold",
          description:
            "Opret indhold som du senere kan tilføje til en infoskærm",
          href: "/dashboard/content/create",
          button: "Opret indhold",
        },
        {
          name: "Administration",
          description: "Administrer brugere og deres adgang",
          href: "/dashboard/management/users",
          button: "Administrer brugere",
        },
      ],
      activeTitle: 'Aktive infoskærme "IKKE IMPLEMENTERET"',
      activeDescription:
        "Her kan du se de infoskærm, der er aktive og vises på skærmene. Du kan klikke på dem for at se flere detaljer og administrere dem.",
      seeAllButton: "Se alle infoskærm",
    },
    infoScreenCreate: {
      title: "Opret en ny infoskærm",
      nameLabel: "Giv din infoskærm et navn",
      namePlaceholder: "Titel",
      descriptionLabel: "Beskrivelse af infoskærmen",
      descriptionPlaceholder: "Beskrivelse",
      descriptionHelp:
        "Beskriv din infoskærm og dens formål. Det hjælper dig og dit team med at identificere den senere.",
      colourLabel: "Farve",
      colourHelp:
        "Vælg hovedfarven til din infoskærm. Den vil blive brugt som baggrundsfarve. Du kan altid ændre den senere.",
      submit: "Gem",
      cancel: "Annuller",
    },
    infoScreenSeeAll: {
      title: "Her er alle infoskærme",
      description:
        "Denne liste viser alle infoskærme, der er oprettet for organisationen. Du kan hente et link til deling eller slette en infoskærm, hvis du ikke længere har brug for den.",
      createButton: "Opret en infoskærm",
    },
    infoScreenEdit: {
      title: "Rediger din infoskærm",
      notFound: "infoskærm blev ikke fundet",
    },
    contentCreate: {
      title: "Opret nyt indhold",
      intro:
        "Her kan du oprette indhold til din infoskærm. Du kan også tilføje det til en infoskærm efter du har gemt. Du kan altid redigere eller slette indholdet senere.",
      nameLabel: "Giv dit indhold et navn",
      namePlaceholder: "Navn",
      nameHelp:
        "Det hjælper dig med at finde det senere, når du vil tilføje det til en infoskærm. Det bruges ikke som titel på infoskærmen.",
      titleLabel: "Giv dit indhold en titel",
      titlePlaceholder: "Titel",
      titleHelp: "Dette vises på infoskærmen for dette indhold.",
      textLabel: "Hovedtekst til dit indhold",
      textPlaceholder: "Skriv hovedteksten til dit indhold her",
      imageLabel: "Tilføj et billede (valgfrit)",
      imageHelp: "Vælg et billede at uploade. Dette er valgfrit.",
      contactSectionTitle: "Tilføj kontaktoplysninger (valgfrit)",
      contactEmailLabel: "Kontakt e-mail",
      contactEmailPlaceholder: "E-mail",
      contactNameLabel: "Kontakt navn",
      contactNamePlaceholder: "For- og efternavn",
      contactHelp:
        'Hvis du vil tilføje kontaktoplysninger til indholdet, kan du gøre det her. Det er valgfrit. Det vises som "For mere information, kontakt Fornavn Efternavn på email@email.com" på infoskærmen.',
      submit: "Opret indhold",
      cancel: "Annuller",
    },
    contentSeeAll: {
      title: "Her er alt indhold",
      description:
        "Denne liste viser alt indhold, der er oprettet for organisationen. Du kan ikke slette indhold, der er aktivt på en infoskærm.",
    },
    contentEdit: {
      title: "Rediger indhold",
    },
    sponsorsCreate: {
      title: "Sponsoroversigt",
      formLegend: "Tilføj en ny sponsor",
      formDescription:
        "Dine sponsorer vises på infoskærmene, og du kan tilføje dem her.",
      sponsorNameLabel: "Tilføj sponsorens navn",
      sponsorNamePlaceholder: "Sponsor navn",
      sponsorImageLabel: "Tilføj et billede",
      submit: "Tilføj sponsor",
    },
    organizationChoose: {
      title: "Organisationsoversigt",
      description:
        "Opret din egen organisation eller anmod om medlemskab i en eksisterende.",
      createButton: "Opret organisation",
      placeholders: {
        organizationName: "Organisationsnavn",
        street: "Vej",
        postalCode: "Postnummer",
        city: "By",
        cvrNumber: "CVR-nummer",
        logoUrl: "Logo URL",
      },
    },
    management: {
      title: "Administration",
      organization: "Organisationsadministration",
      users: "Brugeradministration",
    },
    components: {
      infoScreenCard: {
        linkLabel: "Linket til infoskærmen er:",
        colourLabel: "Farven på infoskærmen",
        openButton: "Gå til infoskærm",
        copyButton: "Kopier link",
        editButton: "Rediger",
        deleteButton: "Slet infoskærm",
        copiedToast: "Link kopieret til udklipsholder",
      },
      contentCard: {
        noImage: "Intet billede",
        imageAlt: "Indholdsbillede",
        contactInfo: "Kontaktoplysninger",
        noContactInfo: "Ingen kontaktoplysninger tilføjet til dette indhold",
        deleteButton: "Slet indhold",
        editButton: "Rediger indhold",
      },
      organizationCard: {
        description: "Kort beskrivelse af organisationen.",
        body: "Hvis du vil være med i organisationen, klik på knappen nedenfor for at anmode om medlemskab.",
        requestButton: "Anmod om medlemskab",
        successToast: "Din anmodning er sendt",
        errorToast: "Kunne ikke sende anmodning, prøv igen senere",
      },
      sponsorCard: {
        noImage: "Intet billede",
        logoAlt: "Sponsorlogo",
        deleteButton: "Slet sponsor",
      },
      editInfoScreenForm: {
        titleLabel: "Titel",
        titlePlaceholder: "Titel",
        descriptionLabel: "Beskrivelse",
        descriptionPlaceholder: "Beskrivelse",
        colourLabel: "Farve",
        submit: "Gem",
        cancel: "Annuller",
        successToast: "Din infoskærm er opdateret",
        errorToast: "Kunne ikke opdatere infoskærmen, prøv igen senere",
      },
      contentDragDrop: {
        allContent: "Alt indhold",
        activeContent: "Aktivt indhold",
        help: "Tilføj eller fjern indhold fra infoskærmen. Husk at gemme, før du forlader siden.",
        saveButton: "Gem indhold på infoskærm",
        successToast: "Indhold er gemt på infoskærmen",
        errorToast: "Noget gik galt",
      },
    },
  },
};

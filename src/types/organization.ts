export type Organization = {
  city: string;
  createdAt: Date;
  cvrNumber: string | null;
  id: string;
  logo: string | null;
  name: string;
  postalCode: number;
  street: string;
  updatedAt: Date;
};

export type Membership = {
  isAdmin: boolean;
  organization: Organization;
  organizationId: string;
  userId: string;
};

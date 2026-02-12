"use client";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useState } from "react";
import { Membership } from "../types/organization";
import { setSelectedOrganization } from "@/lib/organizationActions";

const OrganizationSwitcher = ({
  organizations,
  defaultOrganization,
}: {
  organizations: Membership[];
  defaultOrganization?: string | null;
}) => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(defaultOrganization ?? organizations[0]?.organizationId ?? null);

  const selectedOrganization = organizations.find(
    (m) => m.organizationId === selectedOrganizationId,
  );

  const handleOrganizationChange = async (organizationId: string) => {
    setSelectedOrganizationId(organizationId);
    await setSelectedOrganization(organizationId);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">
                  {selectedOrganization?.organization.name ??
                    "Select Organization"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {organizations.map((membership) => (
              <DropdownMenuItem
                key={membership.organizationId}
                onSelect={() =>
                  handleOrganizationChange(membership.organizationId)
                }
              >
                {membership.organization.name}
                {membership.organizationId === selectedOrganizationId && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default OrganizationSwitcher;

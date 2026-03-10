"use client";

import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { setSelectedOrganization } from "@/lib/organizationActions";

interface OrganizationSelectButtonProps {
  organizationId: string;
}

const OrganizationSelectButton = ({
  organizationId,
}: OrganizationSelectButtonProps) => {
  const handleSelect = async () => {
    await setSelectedOrganization(organizationId);
    redirect("/dashboard");
  };

  return (
    <Button variant="default" onClick={handleSelect}>
      Continue to dashboard
    </Button>
  );
};

export default OrganizationSelectButton;

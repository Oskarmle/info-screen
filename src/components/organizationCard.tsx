"use client";
import { requestOrganizationMembership } from "@/lib/organizationActions";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";

type OrganizationCardProps = {
  membership: {
    organization: {
      id: string;
      name: string;
    };
  };
};

const OrganizationCard = ({ membership }: OrganizationCardProps) => {
  const handleRequestMembership = async () => {
    const res = await requestOrganizationMembership(membership.organization.id);

    if (res.success) {
      toast.success("Your request has been send", {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to request membership, try again later", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card key={membership.organization.id} className="w-[400px]">
      <CardHeader>
        <CardTitle>{membership.organization.name}</CardTitle>
        <CardDescription>
          Some description about the organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm">
          If you wish to join this organization, please click the button below
          to request membership.
        </p>
        <Button variant={"default"} onClick={handleRequestMembership}>
          Request Membership
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;

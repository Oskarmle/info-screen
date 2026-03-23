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
import { Organization } from "@/generated/prisma/client";
import type { Locale } from "@/src/i18n/config";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

type OrganizationCardProps = {
  organization: Organization;
  locale: Locale;
};

const OrganizationCard = ({ organization, locale }: OrganizationCardProps) => {
  const t = dashboardMessages[locale].components.organizationCard;

  const handleRequestMembership = async () => {
    const res = await requestOrganizationMembership(organization.id);

    if (res.success) {
      toast.success(t.successToast, {
        position: "bottom-right",
      });
    } else {
      toast.error(t.errorToast, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card key={organization.id} className="w-100">
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm">{t.body}</p>
        <Button variant={"default"} onClick={handleRequestMembership}>
          {t.requestButton}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;

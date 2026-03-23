import { auth } from "@/lib/auth";
import {
  createOrganization,
  fetchAllOrganizations,
} from "@/lib/organizationActions";
import OrganizationCard from "@/src/components/organizationCard";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { withLocalePath } from "@/src/i18n/config";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].organizationChoose;

  const organizations = await fetchAllOrganizations();

  return (
    <div
      className="flex flex-col flex-1 min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p>{t.description}</p>
      </div>
      <div className="flex flex-1 mt-4 min-h-0 w-full">
        <div className="flex justify-around w-full min-h-0 overflow-hidden">
          <form
            className="w-1/2 gap-4 flex flex-col rounded-lg"
            action={async (formData: FormData) => {
              "use server";
              const res = await createOrganization(formData);
              if (res.success) {
                redirect(withLocalePath(locale, "/dashboard"));
              }
            }}
          >
            <Input
              name="name"
              placeholder={t.placeholders.organizationName}
              type="text"
              required
              autoComplete="organization"
            />
            <Input
              name="street"
              placeholder={t.placeholders.street}
              type="text"
              required
              autoComplete="street-address"
            />
            <Input
              name="postalCode"
              placeholder={t.placeholders.postalCode}
              type="number"
              required
              autoComplete="postal-code"
            />
            <Input
              name="city"
              placeholder={t.placeholders.city}
              type="text"
              required
              autoComplete="address-level2"
            />
            <Input
              name="cvrNumber"
              placeholder={t.placeholders.cvrNumber}
              type="text"
              autoComplete="organization"
            />
            <Input
              name="logo"
              placeholder={t.placeholders.logoUrl}
              type="text"
              autoComplete="logo"
            />
            <Button className="w-full" type="submit">
              {t.createButton}
            </Button>
          </form>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-6 overflow-auto pr-4 rounded-lg">
            {(organizations.data ?? []).map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

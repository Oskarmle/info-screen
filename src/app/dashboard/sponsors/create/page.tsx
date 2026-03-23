import { auth } from "@/lib/auth";
import {
  createSponsor,
  fetchAllSponsorsForOrganization,
} from "@/lib/sponsorActions";
import SponsorCard from "@/src/components/SponsorCard";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const sponsors = await fetchAllSponsorsForOrganization(
    selectedOrganizationId ?? "",
  );

  return (
    <div
      className="flex flex-col min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Sponsor Dashboard</h1>
      </div>
      <div className="flex flex-1 mt-4 min-h-0 w-full">
        <div className="flex justify-around w-full min-h-0 overflow-hidden">
          <form
            className="w-1/2 gap-4 flex flex-col rounded-lg"
            action={async (formData: FormData) => {
              "use server";
              const res = await createSponsor(formData);
              if (res.success) {
                formData.delete("name");
                formData.delete("image");
              }
            }}
          >
            <input
              type="hidden"
              name="organizationId"
              value={selectedOrganizationId ?? ""}
            />
            <FieldSet>
              <FieldLegend>Add a new sponsor</FieldLegend>
              <FieldDescription>
                You can add your sponsors on the different infoscreens after
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Add the sponsors name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Sponsor name"
                    required
                    name="name"
                    type="text"
                    autoComplete="sponsor name"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="image">Add an image</FieldLabel>
                  <Input type="file" id="image" name="image" />
                </Field>
                <Field>
                  <Button variant="default" type="submit">
                    Add sponsor
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-4 overflow-auto pr-4 rounded-lg">
            {sponsors?.data?.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

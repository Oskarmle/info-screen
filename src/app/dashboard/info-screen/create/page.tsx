import { fetchColours } from "@/lib/colourAction";
import { createInfoScreen } from "@/lib/infoScreenActions";
import ColourPickerInfoScreen from "@/src/components/ColourPickerInfoScreen";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const coloursResult = await fetchColours();
  const colours = coloursResult.success ? coloursResult.data ?? [] : [];

  return (
    <div
      className="flex flex-col min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Create a new info screen</h1>
      </div>
      <div className="flex items-center flex-col">
        <form
          className="flex mt-4 min-h-0 w-full"
          action={async (formData: FormData) => {
            "use server";
            const res = await createInfoScreen(formData);
            if (res.success) {
              redirect("/dashboard");
            }
            console.log(res);
          }}
        >
          <input
            type="hidden"
            name="organizationId"
            value={selectedOrganizationId ?? ""}
          />
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">
                    Give a name to your info screen
                  </FieldLabel>
                  <Input
                    id="title"
                    placeholder="Title"
                    required
                    name="title"
                    type="text"
                    autoComplete="title"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">
                    Description of the info screen
                  </FieldLabel>
                  <Textarea
                    placeholder="Description"
                    id="description"
                    required
                    name="description"
                    autoComplete="description"
                    className="h-40"
                  />
                  <FieldDescription>
                    Describe your info screen and its purpose. This will help
                    you and your team to identify it later.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="colour-picker">Colour</FieldLabel>
                  <ColourPickerInfoScreen colours={colours} />
                  <FieldDescription>
                    Choose the main colour for your info screen. This will be
                    used as the background colour and accent colour for your
                    info screen. You can always change it later.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field>
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default Page;

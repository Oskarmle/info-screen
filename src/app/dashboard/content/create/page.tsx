import { createContent } from "@/lib/contentActions";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
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

  return (
    <div
      className="flex flex-col min-h-0 w-full gap-4 rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Create new content</h1>
        <p className="text-sm">
          You can create content for your info-screen here. You also have the
          option to add it to an info-screen after you save it. You can always
          edit/delete thh content later.
        </p>
      </div>
      <div className="flex items-center flex-col">
        <form
          className="flex mt-4 min-h-0 w-full"
          action={async (formData: FormData) => {
            "use server";
            const res = await createContent(formData);
            if (res.success) {
              redirect("/dashboard/content/see-all");
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
                  <FieldLabel htmlFor="name">
                    Give a name to your content
                  </FieldLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                  />
                  <FieldDescription>
                    This will help you find it later when you want to add it to
                    an info screen. It will not be used as the title for your
                    info screen.
                  </FieldDescription>
                </Field>

                <FieldSeparator />

                <Field>
                  <FieldLabel htmlFor="title">
                    Give your content a title
                  </FieldLabel>
                  <Input
                    id="title"
                    placeholder="Title"
                    required
                    name="title"
                    type="text"
                    autoComplete="title"
                  />
                  <FieldDescription>
                    This will be shown on the info-screen for this piece of
                    content.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="text">
                    The main text for your content
                  </FieldLabel>
                  <Textarea
                    placeholder="Write the main text for your content here"
                    id="text"
                    required
                    name="text"
                    autoComplete="text"
                    className="h-40"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="image">
                    Add an image (optional)
                  </FieldLabel>
                  <Input type="file" id="image" name="image" />
                  <FieldDescription>
                    Select a image to upload. This is optional.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldGroup>
                <FieldLabel htmlFor="contactName" className="text-lg">
                  Add contact information (optional)
                </FieldLabel>
                <div className="flex flex-row w-full gap-4">
                  <Field>
                    <FieldLabel htmlFor="contactEmail">
                      Contact email
                    </FieldLabel>
                    <Input
                      id="contactEmail"
                      placeholder="E-mail"
                      name="contactEmail"
                      type="text"
                      autoComplete="contactEmail"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="contactName">Contact name</FieldLabel>
                    <Input
                      id="contactName"
                      placeholder="First and last name"
                      name="contactName"
                      type="text"
                      autoComplete="contactName"
                    />
                  </Field>
                </div>
                <FieldDescription>
                  If you want to add contact information for this content, you
                  can add it here. This is optional. It will be shown as
                  <span>
                    &quot;For more information, contact FirstName LastName on
                    email@email.com&quot;
                  </span>
                  on the info-screen.
                </FieldDescription>
              </FieldGroup>
            </FieldSet>
            <Field>
              <Button type="submit">Create content</Button>
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

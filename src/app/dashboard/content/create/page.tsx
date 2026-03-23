import { auth } from "@/lib/auth";
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
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Textarea } from "@/src/components/ui/textarea";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { withLocalePath } from "@/src/i18n/config";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].contentCreate;

  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  return (
    <div
      className="flex min-h-0 flex-1 w-full flex-col gap-4 overflow-hidden rounded-lg p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-sm">{t.intro}</p>
      </div>
      <ScrollArea className="min-h-0 flex-1 pr-4">
        <div className="w-full">
          <form
            className="mt-4 flex min-h-0 w-full"
            action={async (formData: FormData) => {
              "use server";
              const res = await createContent(formData);
              if (res.success) {
                redirect(withLocalePath(locale, "/dashboard/content/see-all"));
              }
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
                      {t.nameLabel}
                    </FieldLabel>
                    <Input
                      id="name"
                      placeholder={t.namePlaceholder}
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                    />
                    <FieldDescription>{t.nameHelp}</FieldDescription>
                  </Field>

                  <FieldSeparator />

                  <Field>
                    <FieldLabel htmlFor="title">
                      {t.titleLabel}
                    </FieldLabel>
                    <Input
                      id="title"
                      placeholder={t.titlePlaceholder}
                      required
                      name="title"
                      type="text"
                      autoComplete="title"
                    />
                    <FieldDescription>{t.titleHelp}</FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="text">
                      {t.textLabel}
                    </FieldLabel>
                    <Textarea
                      placeholder={t.textPlaceholder}
                      id="text"
                      required
                      name="text"
                      autoComplete="text"
                      className="h-40"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="image">
                      {t.imageLabel}
                    </FieldLabel>
                    <Input type="file" id="image" name="image" />
                    <FieldDescription>{t.imageHelp}</FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <FieldLabel htmlFor="contactName" className="text-lg">
                    {t.contactSectionTitle}
                  </FieldLabel>
                  <div className="flex flex-row w-full gap-4">
                    <Field>
                      <FieldLabel htmlFor="contactEmail">
                        {t.contactEmailLabel}
                      </FieldLabel>
                      <Input
                        id="contactEmail"
                        placeholder={t.contactEmailPlaceholder}
                        name="contactEmail"
                        type="text"
                        autoComplete="contactEmail"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="contactName">
                        {t.contactNameLabel}
                      </FieldLabel>
                      <Input
                        id="contactName"
                        placeholder={t.contactNamePlaceholder}
                        name="contactName"
                        type="text"
                        autoComplete="contactName"
                      />
                    </Field>
                  </div>
                  <FieldDescription>{t.contactHelp}</FieldDescription>
                </FieldGroup>
              </FieldSet>
              <Field>
                <Button type="submit">{t.submit}</Button>
                <Button variant="outline" type="button">
                  {t.cancel}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;

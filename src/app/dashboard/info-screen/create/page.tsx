import { auth } from "@/lib/auth";
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
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { withLocalePath } from "@/src/i18n/config";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].infoScreenCreate;

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
        <h1 className="text-2xl font-bold">{t.title}</h1>
      </div>
      <div className="flex items-center flex-col">
        <form
          className="flex mt-4 min-h-0 w-full"
          action={async (formData: FormData) => {
            "use server";
            const res = await createInfoScreen(formData);
            if (res.success) {
              redirect(withLocalePath(locale, "/dashboard"));
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
                  <FieldLabel htmlFor="title">
                    {t.nameLabel}
                  </FieldLabel>
                  <Input
                    id="title"
                    placeholder={t.namePlaceholder}
                    required
                    name="title"
                    type="text"
                    autoComplete="title"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">
                    {t.descriptionLabel}
                  </FieldLabel>
                  <Textarea
                    placeholder={t.descriptionPlaceholder}
                    id="description"
                    required
                    name="description"
                    autoComplete="description"
                    className="h-40"
                  />
                  <FieldDescription>{t.descriptionHelp}</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="colour-picker">{t.colourLabel}</FieldLabel>
                  <ColourPickerInfoScreen colours={colours} />
                  <FieldDescription>{t.colourHelp}</FieldDescription>
                </Field>
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
    </div>
  );
};

export default Page;

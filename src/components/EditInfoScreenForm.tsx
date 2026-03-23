"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ColourPickerInfoScreen from "./ColourPickerInfoScreen";
import { Button } from "./ui/button";
import { InfoScreen } from "@/generated/prisma/client";
import { updateInfoScreen } from "@/lib/infoScreenActions";
import { toast } from "sonner";
import type { Locale } from "@/src/i18n/config";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

type Colour = { id: string; name: string; oklch: string };

type EditInfoScreenFormProps = {
  infoScreen: InfoScreen;
  colours: Colour[];
  locale: Locale;
};

const EditInfoScreenForm = ({
  infoScreen,
  colours,
  locale,
}: EditInfoScreenFormProps) => {
  const t = dashboardMessages[locale].components.editInfoScreenForm;

  const handleSubmit = async (formData: FormData) => {
    const res = await updateInfoScreen(formData, infoScreen.id);
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
    <form action={handleSubmit}>
      <input
        type="hidden"
        name="organizationId"
        value={infoScreen.organizationId}
      />
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">{t.titleLabel}</FieldLabel>
            <Input
              id="title"
              placeholder={t.titlePlaceholder}
              required
              name="title"
              type="text"
              autoComplete="title"
              defaultValue={infoScreen.title}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">{t.descriptionLabel}</FieldLabel>
            <Textarea
              placeholder={t.descriptionPlaceholder}
              id="description"
              required
              name="description"
              autoComplete="description"
              className="h-40"
              defaultValue={infoScreen.description}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="colour-picker">{t.colourLabel}</FieldLabel>
            <ColourPickerInfoScreen
              colours={colours}
              defaultColourId={infoScreen.colourId}
            />
          </Field>
          <Field className="flex flex-col gap-2 justify-between">
            <Button type="submit">{t.submit}</Button>
            <Button variant="outline" type="button">
              {t.cancel}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default EditInfoScreenForm;
